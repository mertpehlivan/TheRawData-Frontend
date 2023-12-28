import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
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
        setUserId(response.data)
        setAuthenticated(true);
        setToken(authToken);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [baseUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{ isLoading, userId, setUserId, token, setToken, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
