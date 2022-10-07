import React from 'react';
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@mui/material'
import MainLayout from 'components/layout/MainLayout'

export default function Private() {

  return (
    <MainLayout title="Private">
      <Link component={RouterLink} to="/private/profile">account</Link>
    </MainLayout>
  )
}

