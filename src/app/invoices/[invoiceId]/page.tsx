import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { AVAILABLE_STATUSES } from '@/data/invoice';

async function InvoicePage({params}: {params: {invoiceId: string}}) {
  const {userId} = auth();

  if(!userId){
    return;
  }

  const invoiceId = parseInt(params.invoiceId);

  if(isNaN(invoiceId)){
    throw new Error('Invalid invoice Id')
  }
  const [result] = await db.select().from(Invoices).where(
  and(
  eq(Invoices.id, invoiceId),
  eq(Invoices.userId, userId)
)).limit(1);

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

<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2"
                  variant="outline"
                  type="button"
                >
                  Change Status
                  <ChevronDown className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form>
                        {/* <input type="hidden" name="id" value={invoice.id} /> */}
                        <input type="hidden" name="status" value={status.id} />
                        <button type="submit">{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

    </div> 

 
  
</main>
  )
}

export default InvoicePage