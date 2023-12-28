import { Icon } from "@iconify/react";
import { Avatar, Badge, Button, Divider, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import InvitationBox from "./InvitationBox";
import { Link } from "react-router-dom";

const UserPopover = ({handleClick,anchorEl,setAnchorEl}) => {
    
  
    
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    return (
      <Popover
        sx={{borderRadius:3}}
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
        <Stack width={300} borderRadius={3}>
            <Typography variant="h6" m={2}>Invitations</Typography>
            <Divider/>
            <InvitationBox/>
            <InvitationBox/>
            <Typography bgcolor="primary.main" textAlign="center"><Link style={{color:"white"}}>see more(2)</Link></Typography>
        </Stack>
      </Popover>
    );
  };
  
  const Envelope = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
      <Stack direction="row" alignItems="center" mx={2}>
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            onClick={handleClick}
        >
              <Badge badgeContent={3} color="error">
                <EmailIcon color="primary"/>
              </Badge>
        </IconButton>
        <UserPopover handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
      </Stack>
    );
  };
  
  export default Envelope;