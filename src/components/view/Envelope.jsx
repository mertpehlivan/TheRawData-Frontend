import { Icon } from "@iconify/react";
import { Avatar, Badge, Button, Divider, IconButton, List, ListItem, Popover, Stack, Tooltip, Typography, debounce } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import InvitationBox from "./InvitationBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../hooks/AuthProvider";
import { getUserBox } from "../../services/userService";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getInvitations } from "../../services/notificationService"
import { addAuthorPost } from "../../services/post/postService";

const UserPopover = ({ click, notification, setNotification, anchorEl, setAnchorEl }) => {

  const open = Boolean(anchorEl);
  const [messages, setMessages] = useState([]);
  const [endMessages, setEndMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [userTrigger, setUserTrigger] = useState(false)
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0)


  const { token, user } = useUserContext()

  const acceptHandler = (publicationPostId) => {
    console.log(publicationPostId)
    addAuthorPost(token, publicationPostId).then((res) => {
      console.log(res.data)
    }).catch(e => console.error(e))
  }

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
  useEffect(() => {

    const size = 6; // Sayfa boyutu
    getInvitations(page, token, size)
      .then(response => {
        console.log('invitation:', response.data);
        setEndMessages(prev => [...prev, ...response.data])
        setIsPageIncrementing(false);
        setUserTrigger(true)
      })
      .catch(error => {
        setIsPageIncrementing(false);
        console.error('Hata:', error);
      });
  }, [page]);





  useEffect(() => {
    // Only run this effect after user data is available
    if (userTrigger) {
      console.log(user);
      console.log('Connecting to server:', 'http://localhost:8080/ws');
      const socket = new SockJS('http://localhost:8080/ws');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        client.subscribe(`/topic/${user.id}/invitations`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          console.log(receivedMessage)
          setNotification(prev => prev + 1)
        });
      });

      setStompClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, [userTrigger]);
  


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
                    <Stack direction="row">
                      <Typography fontSize={12}><Link to={msg.userUrl}>{msg.fullName}</Link> {msg.contant.slice(12, 62)} <Link to={msg.publicationUrl}>{msg.title}</Link> {msg.contant.slice(90)}</Typography>
                      <Stack alignItems="center" >
                        <Button onClick={() => acceptHandler(msg.publicationId)} variant="contained" color="success">Admit</Button>
                        <Button color="error">Reject</Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </ListItem>
              ))
            }
            {
              endMessages.map((msg, index) => (
                msg && msg.fullName && msg.contant && msg.publicationUrl && msg.title && (
                  <ListItem key={index} divider>
                    <Stack>
                      <Stack direction="row">
                        <Typography fontSize={12}><Link to={msg.userUrl}>{msg.fullName}</Link> {msg.contant.slice(12, 62)} <Link to={msg.publicationUrl}>{msg.title}</Link> {msg.contant.slice(90)}</Typography>
                        <Stack alignItems="center" >
                          <Button onClick={() => acceptHandler(msg.publicationId)} variant="contained" color="success">Admit</Button>
                          <Button color="error">Reject</Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </ListItem>
                )
              ))
            }
          </List>
        </div>

      </Stack>

    </Popover>
  );
};
const Envelope = () => {
  const [notification, setNotification] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotification(0);
  };
  return (
    <Stack direction="row" alignItems="center" mx={2}>

      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notification} color="error">
          <EmailIcon color="primary" />
        </Badge>
      </IconButton>


      <UserPopover setNotification={setNotification} notification={notification} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Stack>
  );
};

export default Envelope;