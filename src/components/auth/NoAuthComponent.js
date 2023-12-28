import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/AuthProvider';

export const NoAuthComponent = () => {
    const { authenticated} = useUserContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (authenticated === true) {
            navigate('/');
        }
    }, [authenticated, navigate]);
   
    return authenticated ? null : <Outlet />;
};
