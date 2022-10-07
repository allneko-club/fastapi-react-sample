import React from 'react';
import MainNav from 'components/navigation/MainNav'

export default function MainLayout({title, ...props}) {
  return (
    <>
      <MainNav />
      <main>
        <h1>{title}</h1>
        {props.children}
      </main>
    </>
  )
}