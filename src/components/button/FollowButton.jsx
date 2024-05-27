import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useUserContext } from '../../hooks/AuthProvider';
import { followUser, unfollowUser, isFollowingUser } from '../../services/followService';

const FollowButton = ({ followingId }) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { token, userId } = useUserContext();

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const result = await isFollowingUser(followingId, token);
        setIsFollowing(result);
      } catch (error) {
        setIsFollowing(false);
        console.error('Error checking follow status:', error);
      }
    };

    checkIfFollowing();
  }, [followingId]);

  const handleFollowToggle = async () => {
    try {
      setLoading(true);

      if (!isFollowing) {
        const success = await followUser(followingId, token);

        if (success) {
          setIsFollowing(true);
          setAlertMessage('Request sent successfully');
          setOpenSnackbar(true);
        }
      } else {
        const success = await unfollowUser(followingId, token);

        if (success) {
          setIsFollowing(false);
          setAlertMessage('User unfollowed successfully!');
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      console.error('Follow toggle error:', error);
      setAlertMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // userId ile followingId aynıysa işlem yapma
  if (userId === followingId) {
    return null; // or any other logic you want
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        size='small'
        variant="contained"
        onClick={handleFollowToggle}
        sx={{
          backgroundColor: isFollowing ? '#f44336' : 'primary.main',
          color: '#fff',
          '&:hover': {
            backgroundColor: isFollowing ? '#d32f2f' : '#1565c0',
          },
        }}
        disabled={loading}
        startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
      >
        {loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setOpenSnackbar(false)}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FollowButton;
