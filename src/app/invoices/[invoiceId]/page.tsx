import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
  
async function InvoicePage({params}: {params: {invoiceId: string}}) {
  
  const invoiceId = parseInt(params.invoiceId);

  if(isNaN(invoiceId)){
    throw new Error('Invalid invoice Id')
  }
  const [result] = await db.select().from(Invoices).where(eq(Invoices.id, invoiceId)).limit(1);

  console.log('result', result)


  if(!result){
    notFound()
  }

  
  return (
    <main className="flex flex-col justify-center  h-full text-center gap-6 max-w-5xl mx-auto my-12">  
    
    <div className="flex flex-col justify-between">
      <h1 className="text-3xl font-semibold">Invoices</h1>
     <h2>Billing Details</h2>
     {Array.isArray(result) ? (
       result.map(res => (
         <div key={res.id}>
           {res.id}
         </div>
       ))
     ) : (
       <div key={result.id}>
         {result.id}
       </div>
     )}
    </div> 

 
  
</main>
  )
}

export default InvoicePage