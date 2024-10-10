"use server"

import { Invoices } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export async function createAction(formData: FormData) {
  const {userId} = auth();
    //to store it as an integer upto 2 decimal point
   const value = Math.floor(parseFloat(String(formData.get('value')))) * 100
   console.log(value);
   const description = formData.get('description') as string;
   
   if(!userId){
    return;
   }

   const results = await db.insert(Invoices).values({
    value,
    description,
    status: "open",
    userId
   })
.returning({
    id: Invoices.id
})
  redirect(`/invoices/${results[0].id}`)
}


  export async function updateStatusAction(formData: FormData){
    const {userId} = auth();

    if(!userId){
        return;
    }

    const id = formData.get('id') as string;
    const status = formData.get('status') as string;
    
    // const results = await db.update(Invoices)
    // .set({status})
    
  }