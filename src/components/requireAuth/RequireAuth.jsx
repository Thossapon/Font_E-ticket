import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const RequireAuth = ({ allowRoles }) => {
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