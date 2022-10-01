import React from 'react';
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@mui/material'
import MainLayout from 'components/layout/MainLayout'

export default function ResetPasswordConfirmDone() {
  return (
    <MainLayout title="Reset Password Complete">
      <p>success password reset</p>
      <Link component={RouterLink} to="/login/">Login</Link>
    </MainLayout>
  );
}