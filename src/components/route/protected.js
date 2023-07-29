import React, { useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../app/context/auth';

export default function SecureRoute({ children }) {
  const { logged } = useContext(AuthContext);
  if (!logged) {
    return <Navigate to="/" replace />
  }
  return children
}
