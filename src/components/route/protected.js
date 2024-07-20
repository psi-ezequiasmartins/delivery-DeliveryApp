/**
 * src/components/route/protected.jsx
 */

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { authenticated, signOut } = useContext(AuthContext);
  if (!authenticated) {
    signOut();
    return <Navigate to="/app/login" replace />
  }
  return children
}
