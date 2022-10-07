import React from 'react';
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@mui/material'
import {useAuth} from 'components/AuthProvider'
import MainLayout from 'components/layout/MainLayout'

export default function Profile() {
  const auth = useAuth();
  return (
    <MainLayout title="Account">
      {auth.user &&
        <div>
          <p>id: {auth.user.id}</p>
          <p>name: {auth.user.name}</p>
          <p>email: {auth.user.email}</p>
          <p>is_active: {auth.user.is_active.toString()}</p>
          <p>is_superuser: {auth.user.is_superuser.toString()}</p>
          <p>items: {auth.user.items}</p>
        </div>
      }
      <div>
        <Link component={RouterLink} to="/private/update-profile">Edit</Link>
        <br/>
        <Link component={RouterLink} to="/private/update-password">Update password</Link>
      </div>
    </MainLayout>
  );
}
