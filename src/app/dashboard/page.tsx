import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
import { Ghost } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { Invoices } from '@/db/schema';
import { db } from '@/db';
import Container from '@/components/Container';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
  
const page = async () => {
  const {userId} = auth();

  if(!userId) {
    return;
  }

  const results = await db.select().from(Invoices).where(eq(Invoices.userId, userId));
  
  console.log(results)

  return (
    <main className="h-full  my-12">  
    <Container>
    {/* max-w-5xl or w-3/4 i also tried is used for centering the table in large screen  
    2) asChild allows us to have things in same left right line (NEW THING)*/}
    <div className="flex justify-between">
    <h1 className="text-3xl font-semibold">Invoices</h1>
    <p>
       <Button variant="ghost"  className="inline-flex gap-2" asChild>
        <Link href="/invoices/new">
       <CirclePlus className="h-4 w-4"/>
        Create Invoice
        </Link>
        </Button> 
    </p>
   </div> 
    <Table className='mx-auto'>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px] p-4">Date</TableHead>
      <TableHead className="p-4">Customer</TableHead>
      <TableHead className="p-4">Email</TableHead>
      <TableHead className='text-center'>Status</TableHead>
      <TableHead className="text-right p-4">Value</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {results.map(result => {
      return (
        <>
        <TableRow key={result.id}>
        <TableCell className="font-medium text-left p-4 ">
          <span className="font-semibold">
            <Link href={`invoices/${result.id}`}>
            {new Date(result.createTs).toLocaleDateString()}
            </Link>
          
          </span></TableCell>
        <TableCell className="text-left p-4">
          <span className='font-semibold'>
          <Link href={`invoices/${result.id}`}>
           Philip J.
           </Link>
          </span></TableCell>
        <TableCell className="text-left p-4">aws@gmail.com</TableCell>
        <TableCell className="p-4">
        <Badge className="rounded-md bg-blue-600 " >
          {result.status}</Badge>     
        </TableCell>
        <TableCell className="text-right p-4">${(result.value /100).toFixed(2)}</TableCell>
      </TableRow>
      </>
      )
    })}
   
  </TableBody>
</Table>
</Container>
</main>
  )
}

export default page