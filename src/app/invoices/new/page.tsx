"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createAction } from '@/app/actions'
import dynamic from 'next/dynamic'
import Container from '@/components/Container'
import { useRouter } from 'next/navigation'

const SubmitButton = dynamic(() => import('@/components/SubmitButton'), { ssr: false })

export default function NewInvoicePage() {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const router = useRouter()

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    const form = event.currentTarget
    const formData = new FormData(form)
   console.log("new form data", formData)
    try {
      const result = await createAction(formData)
      if (result?.success) {
        router.push(`/invoices/${result.invoiceId}`)
      } else {
        // Handle error
        console.error('Failed to create invoice')
      }
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
          <Label htmlFor="name" className="block mb-2 font-semibold text-sm">Billing Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 font-semibold text-sm">Billing Email</Label>
          <Input type="email" id="email" name="email" required />
        </div>
        <div>
          <Label htmlFor="value" className="block mb-2 font-semibold text-sm">Value</Label>
          <Input type="number" id="value" name="value" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="description" className="block mb-2 font-semibold text-sm">Description</Label>
          <Input type="text" id="description" name="description" />
        </div>

        <SubmitButton isPending={isSubmitting} />
      </form>
      </Container>
    
  )
}
