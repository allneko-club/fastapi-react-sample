import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from 'components/AuthProvider'

export default function PrivateRoot() {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to='/login' replace={true} />;
  }
  return <Outlet />;
}