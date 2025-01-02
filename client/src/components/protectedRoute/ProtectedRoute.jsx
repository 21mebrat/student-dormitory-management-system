import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, alloweduser }) => {
  const location = useLocation();
  const auth = useSelector(state=>state.auth)
  //const { auth } = useAuth()
  const isAllowed = alloweduser?.includes(auth?.role);
  console.log(auth?.role)
  if (!auth?.userName) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
