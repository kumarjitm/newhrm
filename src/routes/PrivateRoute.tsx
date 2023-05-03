import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  // const isLoggedIn= expireTime > (now-setTime);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
