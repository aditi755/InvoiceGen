"use client"

import React, { SyntheticEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createAction } from '@/app/actions'
import dynamic from 'next/dynamic'
import Container from '@/components/Container'

const SubmitButton = dynamic(() => import('@/components/SubmitButton'), { ssr: false })

export default function NewInvoicePage() {
   const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleOnSubmit(event: SyntheticEvent) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)

    try {
      await createAction(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // <main className="flex flex-col gap-6 max-w-5xl  my-12">  
    <Container className="max-w-5xl mx-12 sm:mx-26 lg:mx-42 xl:mx-72">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Create Invoice</h1> 
      </div> 
   
      <form onSubmit={handleOnSubmit} className='grid gap-4 max-w-xs'>
        <div>
          <Label className="block mb-2 font-semibold text-sm">Billing Name</Label>
          <Input type="text" id="name" name="name"/>
        </div>
        <div>
          <Label className="block mb-2 font-semibold text-sm">Billing Email</Label>
          <Input type="email" id="email" name="email" />
        </div>
        <div>
          <Label className="block mb-2 font-semibold text-sm">Value</Label>
          <Input type="textarea" id="value" name="value" />
        </div>
        <div>
          <Label className="block mb-2 font-semibold text-sm">Description</Label>
          <Input type="text" id="description" name="description"/>
        </div>

        <SubmitButton isPending={isSubmitting} />
      </form>
      </Container>
    
  )
}