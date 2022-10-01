import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from 'components/AuthProvider'

export default function PrivateRoot() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    }
  }, []);

  if (auth.user){
    return <Outlet />;
  } else {
    return null;
  }
}