import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import useAuth from '../../hooks/useAuth';
const RequireAuth = ({ allowRoles }) => {
  const { UserID, Role } = useAuth();
  const { currentUser } = useContext(AuthContext)
  const location = useLocation();
  return (
    allowRoles.includes(Role)
      ? <Outlet />
      : <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth