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
  const baseUrl = process.env.REACT_APP_BASE_URL
  const open = Boolean(anchorEl);
  const [messages, setMessages] = useState([]);
  const [endMessages, setEndMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [userTrigger, setUserTrigger] = useState(false)
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0)


  const { token, user } = useUserContext()

  const acceptHandler = (publicationPostId, invitationId) => {
    console.log(publicationPostId)
    addAuthorPost(token, publicationPostId, invitationId).then((res) => {
      setRefresh(prev => !prev)
      window.location.reload()
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
    setPage(0)
    setEndMessages([])
    setMessages([])
  }, [refresh]);
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
      console.log('Connecting to server:', `${baseUrl}/ws`);
      const socket = new SockJS(`${baseUrl}/ws`);
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
        <Typography m={2} variant="h6" color="primary.main">Mail box</Typography>
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
                    <Stack spacing={2}>
                      <Typography fontSize={12}><Link to={msg.userUrl}>{msg.fullName}</Link> {msg.contant.slice(0, 62)} <Link to={msg.publicationUrl}>{msg.title}</Link> {msg.contant.slice(90)} confirm your authorship.</Typography>
                      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
                        <Button onClick={() => acceptHandler(msg.publicationId, msg.id)} variant="contained" color="success">Confirm</Button>
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
                      <Stack spacing={2}>
                        <Typography fontSize={12}><Link to={msg.userUrl}>{msg.fullName}</Link> {msg.contant.slice(0, 62)} <Link to={msg.publicationUrl}>{msg.title}</Link> {msg.contant.slice(90)} confirm your authorship.</Typography>
                        <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
                          <Button onClick={() => acceptHandler(msg.publicationId, msg.id)} variant="contained" color="success">Confirm</Button>
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