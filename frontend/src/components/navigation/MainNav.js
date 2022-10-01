import React from 'react';
import {useAuth} from 'components/AuthProvider'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {Box, Link} from '@mui/material'

export default function MainNav() {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await auth.logout();
    navigate('/login');
  }

  let nav = <Link component={RouterLink} to="/login/">Login</Link>;
  if (auth.user) {
    nav = (
      <>
        {auth.isSuperuser &&
          <Link component={RouterLink} to={`/admin`}>Admin</Link>
        }
        <Link component={RouterLink} to={`/private/`}>Private</Link>
        <Link component={RouterLink} onClick={logout}>Logout</Link>
      </>
    );
  }

  return (
    <nav>
      <Box sx={{'& > :not(style) + :not(style)': {ml: 1}}}>
        <Link component={RouterLink} to={`/`}>Home</Link>
        {nav}
      </Box>
    </nav>
  );
}