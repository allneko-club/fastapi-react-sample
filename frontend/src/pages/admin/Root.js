import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from 'components/AuthProvider'

export default function AdminRoot() {
  const auth = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
      auth.isSuperuser || navigate('/')
    }, [auth]);

  if (auth.isSuperuser){
    return <Outlet />;
  } else {
    return null;
  }
}