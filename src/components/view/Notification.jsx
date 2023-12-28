
import { Avatar, Badge, Button, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserPopover = ({handleClick,anchorEl,setAnchorEl}) => {

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    return (
      <Popover
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
        <Stack>
            <Button>Profile</Button>
            <Button>My Account</Button>
            <Button>Log Out</Button>
        </Stack>
      </Popover>
    );
  };
  
  const Notification = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
      <Stack direction="row" alignItems="center" spacing={1} mx={2}>
        
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            onClick={handleClick}
        >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon color="primary"/>
              </Badge>
        </IconButton>
        <UserPopover handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
      </Stack>
    );
  };
  
  export default Notification;