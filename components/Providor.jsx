"use client";

import { SessionProvider } from 'next-auth/react'

const Providor = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Providor;
