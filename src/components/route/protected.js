import React from 'react'
import { Navigate } from 'react-router-dom'

export default function SecureRoute({ children }) {
  const vLogged = localStorage.getItem("logged");
  if (!vLogged) {
    return <Navigate to="/" replace />
  }
  return children
}
