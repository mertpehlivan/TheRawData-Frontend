
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
import NotificationPopover from "./NotificationPopover";

const Notification = () => {
  const [stompClient, setStompClient] = useState(null);
  const [endMessages, setEndMessages] = useState([])
  const [notification, setNotification] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState([]);
  const [click, setClick] = useState(false);
  const [userTrigger, setUserTrigger] = useState(false)
  const { token } = useUserContext();
  


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotification(0)
    setClick(!click)
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} mx={2}>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClick}
      >
        {notification > 0 && <Badge badgeContent={notification} color="error">
          <NotificationsIcon color="primary" />
        </Badge>}
        {!notification > 0 &&
          <NotificationsIcon color="primary" />
        }
      </IconButton>
      <NotificationPopover click={click} notification={notification} setNotification={setNotification} handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Stack>
  );
};

export default Notification;