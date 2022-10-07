import React from 'react'
import {Link} from 'react-router-dom'
import AdminLayout from 'components/layout/AdminLayout'

export default function Admin() {
  return (
    <AdminLayout title="Admin">
      <Link to="/admin/users/">Users</Link>
    </AdminLayout>
  );
}
