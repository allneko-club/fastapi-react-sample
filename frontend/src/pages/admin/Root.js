import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from 'components/AuthProvider'

export default function AdminRoot() {
  const auth = useAuth();
  if (!auth.isSuperuser) {
    return <Navigate to='/' replace={true} />;
  }
  return <Outlet />;
}