import { Avatar, Badge, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Popover, Stack, Typography, debounce } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import InvitationBox from "./InvitationBox";
import { Link } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import NotficationComponent from "../NotficationComponent";
import { Notifications, PersonAdd, Try } from "@mui/icons-material";
import { getUserBox } from "../../services/userService";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useUserContext } from "../../hooks/AuthProvider";
import axios from "axios";
const NotificationPopover = ({ click,notification, setNotification, anchorEl, setAnchorEl }) => {
  
  const open = Boolean(anchorEl);
  const [messages, setMessages] = useState([]);
  const [endMessages, setEndMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [userTrigger, setUserTrigger] = useState(false)
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0)

  const handleScroll = debounce(() => {
    if (scrollRef.current && !isPageIncrementing) {
      const scrollTop = scrollRef.current.scrollTop;
      const scrollHeight = scrollRef.current.scrollHeight;
      const clientHeight = scrollRef.current.clientHeight;
      console.log('Scroll pozisyonu:', scrollTop);

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setPage(prev => prev + 1)
        setIsPageIncrementing(true);
      }

      // Scroll'un en üstüne geldiği durumu kontrol etmek için bir şart ekleyebilirsiniz.
      if (scrollTop === 0) {
        console.log('Scroll en üstte!');
      }
    }
  }, 200);
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [user, setUser] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    country: "",
  });
  const { token } = useUserContext()
  useEffect(() => {
    getUserBox(token)
      .then((res) => {
        console.log(res.data);
        setUser({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          country: res.data.country,
          id: res.data.id,
        });
      })
      .catch(() => { })
      .finally(() => {
        // Trigger the second useEffect after user data is fetched
        setUserTrigger(true);
      });
  }, [token]);

  useEffect(() => {
    // Only run this effect after user data is available
    if (userTrigger) {
      console.log(user);
      console.log('Connecting to server:', 'http://localhost:8080/ws');
      const socket = new SockJS('http://localhost:8080/ws');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        client.subscribe(`/topic/${user.id}/notifications`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            setNotification(prev=>prev+1)
        });
      });

      setStompClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, [userTrigger]);
  useEffect(() => {
    const apiEndpoint = 'http://localhost:8080/api/v1/notification/';
    const size = 6; // Sayfa boyutu
    console.log('Effect triggered with page:', page);
    axios.get(apiEndpoint, {

      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        page: page,
        size: size
      }
    })
      .then(response => {
        console.log('Cevap:', response.data);
        setEndMessages(prev => [...prev, ...response.data])
        setIsPageIncrementing(false);
      })
      .catch(error => {
        setIsPageIncrementing(false);
        console.error('Hata:', error);
      });
  }, [page]);
  useEffect(() => {
    const saveValue = localStorage.getItem("notificationCounter");
    if(notification != 0){
        localStorage.setItem("notificationCounter",parseInt(saveValue)+1)
    }
   
  
  }, [notification]);


  return (
    <Popover
      sx={{ borderRadius: 3 }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Stack bgcolor="white" width={300} borderRadius={3}>
        <Typography m={2} variant="h6" color="primary.main">Notification</Typography>
        <Divider />
        <div
          ref={scrollRef}
          style={{
            height: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
          }}
          onScroll={handleScroll}
        >
          <List >
            {
              messages.map((msg, index) => (
                <ListItem key={index} divider>
                  <Stack>

                  {msg.type === "publication" && msg && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Try sx={{ color: "primary.main" }} />
                      <Typography fontSize={12}>{`${msg.content}`} {msg.publicationTitle && <Link to={msg.publicationLink}> {msg.publicationTitle}</Link>} {` by `} <Link to={msg.userLink}>{msg.fullName}</Link></Typography>
                      <Typography color="primary.main">NEW</Typography>
                    </Stack>
                  )}

                  {msg.type === "follow" && msg && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonAdd sx={{ color: "primary.main" }} />
                      <Typography fontSize={12}> <Link to={msg.userLink}>{msg.fullName}</Link> {`   ${msg.content}`} </Typography>
                      <Typography color="primary.main">NEW</Typography>
                    </Stack>
                  )}

                  </Stack>
                </ListItem>
              ))
            }{
              endMessages.map((msg, index) => (
                <ListItem key={index} divider sx={{ height: 60 }}>
                  {msg.type === "publication" && msg &&(
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Try sx={{ color: "primary.main" }} />
                      <Typography fontSize={12}>{`${msg.content}`} {msg.publicationTitle && <Link to={msg.publicationLink}> {msg.publicationTitle}</Link>} {` by `} <Link to={msg.userLink}>{msg.fullName}</Link></Typography>
                    </Stack>
                  )}

                  {msg.type === "follow" && msg && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonAdd sx={{ color: "primary.main" }} />
                      <Typography fontSize={12}> <Link to={msg.userLink}>{msg.fullName}</Link> {`   ${msg.content}`} </Typography>
                    </Stack>
                  )}
                </ListItem>
              ))
            }
          </List>
        </div>

      </Stack>

    </Popover>
  );
};

export default NotificationPopover;