import React from 'react';
import {useAuth} from 'components/AuthProvider'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {Box, Link} from '@mui/material'

export default function AdminNav() {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/login');
  }

  return (
    <nav>
      <Box sx={{'& > :not(style) + :not(style)': {ml: 1}}}>
        <Link component={RouterLink} to={`/admin`}>Admin</Link>
        <Link component={RouterLink} onClick={logout}>Logout</Link>
        <Link component={RouterLink} to={`/`}>Back To Home</Link>
      </Box>
    </nav>
  );
}