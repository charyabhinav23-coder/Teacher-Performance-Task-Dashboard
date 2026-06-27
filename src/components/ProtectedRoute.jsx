/* src/components/ProtectedRoute.jsx */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const activeRole = localStorage.getItem('activeRole');

  if (!activeRole) {
    // Redirect to login if not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    // If logged in but doesn't have role access, redirect to their home dashboard
    if (activeRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (activeRole === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    if (activeRole === 'parent') {
      return <Navigate to="/parent/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
