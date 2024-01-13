import { Icon } from "@iconify/react";
import { Avatar, Button, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../hooks/AuthProvider";

const UserPopover = ({handleClick,anchorEl,setAnchorEl}) => {
    const {user,setAuthenticated} = useUserContext()
    const handleClose = () => {
      setAnchorEl(null);
    };
    const logOut = ()=>{
      localStorage.clear("access-token")
      setAuthenticated(false)
    }
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
            <Button LinkComponent={'a'} href={`/${user.uniqueName}`}>Profile</Button>
            
            <Button href="/myAccount">My Account</Button>
            <Button onClick={logOut}>Log Out</Button>
        </Stack>
      </Popover>
    );
  };
  
  const AvatarButton = () => {
    const {user} = useUserContext()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
      <Stack direction="row" alignItems="center" spacing={1} mx={2}>
        
        <Button onClick={handleClick}>
          <Avatar src={`http://localhost:8080/api/v1/auth/profileImage/${user.profileImageName}`} sx={{width:"25px",height:"25px"}}/>
        </Button>
        <UserPopover handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
      </Stack>
    );
  };
  
  export default AvatarButton;