import { Icon } from "@iconify/react";
import { Avatar, Button, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

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
            <Button LinkComponent={'a'} href="/profile">Profile</Button>
            
            <Button>My Account</Button>
            <Button>Log Out</Button>
        </Stack>
      </Popover>
    );
  };
  
  const AvatarButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
      <Stack direction="row" alignItems="center" spacing={1} mx={2}>
        
        <Button onClick={handleClick}>
          <Avatar sx={{width:"25px",height:"25px"}}/>
        </Button>
        <UserPopover handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
      </Stack>
    );
  };
  
  export default AvatarButton;