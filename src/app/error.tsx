"use client"
//error in root of app dir is client component so use "use client"
import React from 'react'
import NextError from 'next/error'

function Error({error}: {error: Error}) {
  return (
    <div>
    <NextError statusCode={500} title={error.message}/>
    <div>{error.message}</div>
    </div>
  )
}

export default Error