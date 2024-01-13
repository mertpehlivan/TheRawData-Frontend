import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getUserBox } from '../services/userService';
import { CircularProgress, Container, Typography } from '@mui/material';
import { Book } from '@mui/icons-material';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      try {
        const authToken = localStorage.getItem("access-token");

        if (!authToken) {
          setAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/api/v1/check-auth`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const responseUser = await getUserBox(authToken);
        setUser(responseUser.data)
        setUserId(response.data)
        console.log(response.data)
        setAuthenticated(true);
        setToken(authToken);
      } catch (error) {
        setAuthenticated(false);
        console.error("user not found")
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [baseUrl]);

  if (isLoading) {
    return (
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Book sx={{color:'primary.main', width:100,height:100}} />
        <CircularProgress  size={80} thickness={5} style={{ marginBottom: 16 }} />
        <Typography variant="h6">Loading...</Typography>
      </Container>

    );
  }

  return (
    <UserContext.Provider
      value={{ isLoading, user, userId, setUserId, token, setToken, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
