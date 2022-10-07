import React from 'react';
import AdminNav from 'components/navigation/AdminNav'

export default function AdminLayout({title, ...props}) {
  return (
    <>
      <AdminNav />
      <main>
        <h1>{title}</h1>
        {props.children}
      </main>
    </>
  )
}