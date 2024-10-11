"use server"

import { Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
    const status = formData.get('status') as Status;
    
    const results = await db.update(Invoices)
    .set({status})
    .where(and(
      eq(Invoices.id, id),
      eq(Invoices.userId, userId)
    ))

    revalidatePath(`/invoices/${id}`, 'page')

    console.log(results)
    
  }