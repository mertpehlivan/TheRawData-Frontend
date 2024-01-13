import React, { useState, useEffect } from 'react';
import {
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Stack,
} from '@mui/material';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useUserContext } from '../hooks/AuthProvider';
import { useSelector } from 'react-redux';
import { getUserBox } from '../services/userService';

const NotficationComponent = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [userTrigger,setUserTrigger] = useState(false)
    const [user, setUser] = useState({
        id:null,
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
          .catch(() => {})
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
            client.subscribe(`/topic/${user.id}/messages`, (message) => {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
          });
      
          setStompClient(client);
      
          return () => {
            client.disconnect();
          };
        }
      }, [userTrigger]);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const chatMessage = {
                nickname,
                content: message,
            };

            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    return (
        <div>

        </div>
    );
};

export default NotficationComponent;