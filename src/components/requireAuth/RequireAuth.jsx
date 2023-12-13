import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../context/authContext';
const RequireAuth = ({ allowRoles }) => {
  const ADMIN = process.env.REACT_APP_ADMIN_ROLE;
  const {suckUser} = useContext(AuthContext);
  const { currentUser } = useAuth()
  const location = useLocation();
  const [something, setSomething] = useState(false);
  const suckRole = currentUser.Role === allowRoles[0];
  return (
    suckRole
      ? <div>
          <Outlet />
        </div>
      : currentUser?.Username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth