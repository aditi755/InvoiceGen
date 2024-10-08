import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import Container from '@/components/Container'
import Link from 'next/link'
function Header() {
  return (
    <header className='mt-8 mb-12'>
    <Container>
    <div className="flex justify-between items-center p-4">
        <p className="font-bold">
            <Link href={'/dashboard'}>InvoiceGen</Link>
        </p>
        <div>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
    </div>
    </Container>
    </header>
  )
}

export default Header