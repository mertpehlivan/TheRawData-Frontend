import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/AuthProvider';

export const ProtectedComponent = () => {
  const { authenticated } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {

    if (!authenticated == true) {
      navigate('/login');
    }
  }, [authenticated, navigate]); 

  if(!authenticated == true){
    return ;
  }
  
  return <Outlet />;
};