// services/FollowService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL

const followUser = async (followingId, token) => {
  console.log(token);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/follow/${followingId}`,
      {},  // Boş obje ekleyin
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Follow user error:', error);
    throw new Error(`Error following user: ${error.message}`);
  }
};


const unfollowUser = async (followingId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/unfollow/${followingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Unfollow user error:', error);
    throw new Error(`Error unfollowing user: ${error.message}`);
  }
};

const isFollowingUser = async (followingId,token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/user/isFollowing/${followingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking follow status:', error);
    throw new Error(`Error checking follow status: ${error.message}`);
  }
};

export { followUser, unfollowUser, isFollowingUser };
