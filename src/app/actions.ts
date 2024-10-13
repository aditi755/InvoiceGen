"use server"

import { Customers, Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAction(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  const value = Math.floor(
    Number.parseFloat(String(formData.get("value"))) * 100,
  );
  const description = formData.get('description') as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    throw new Error("Name and email are required for customer");
  }

  try {
    const [customer] = await db
      .insert(Customers)
      .values({
        name,
        email,
        userId,
        value, // Add this line if 'value' is required in the Customers table
      })
      .returning({
        id: Customers.id
      });
    
    const [invoice] = await db
      .insert(Invoices)
      .values({
        value,
        description,
        userId,
        customerId: customer.id,
        status: "open",
      })
      .returning({
        id: Invoices.id,
      });

    return { success: true, invoiceId: invoice.id };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error("Failed to create invoice");
  }
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;
    
  const results = await db.update(Invoices)
    .set({ status })
    .where(and(
      eq(Invoices.id, parseInt(id)),
      eq(Invoices.userId, userId)
    ))

  revalidatePath(`/invoices/${id}`, 'page')

  console.log(results)
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const id = formData.get('id') as string;
    
  const results = await db.delete(Invoices)
    .where(and(
      eq(Invoices.id, parseInt(id)),
      eq(Invoices.userId, userId)
    ))

  redirect('/dashboard')

  console.log(results)
}
