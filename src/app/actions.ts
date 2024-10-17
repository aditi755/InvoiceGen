"use server"

import { Customers, Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { initiatePayment } from "./payment";

export async function createAction(formData: FormData) {
  const { userId, orgId } = auth();
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
        organizationId: orgId || null,
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
        organizationId: orgId || null,
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
  const { userId, orgId } = auth();

  // Updating disabled for demo
  // if (userId !== process.env.ME_ID) return;

  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  console.log(`Updating invoice ${id} to status ${status}`);

  if (orgId) {
    const result = await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.organizationId, orgId),
        ),
      );

    console.log(`Update result: ${result}`);
  } else {
    const result = await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId),
        ),
      );

    console.log(`Update result: ${result}`);
  }

  revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, orgId } = auth();

  // Deleting disabled for demo
  // if (userId !== process.env.ME_ID) return;

  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  const id = formData.get("id") as string;

  console.log(`Deleting invoice ${id}`);

  if (orgId) {
    const result = await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.organizationId, orgId),
        ),
      );

    console.log(`Delete result: ${result}`);
  } else {
    const result = await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId),
        ),
      );

    console.log(`Delete result: ${result}`);
  }

  redirect("/dashboard");
}

export async function payInvoiceAction(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const invoiceId = formData.get("invoiceId") as string;
  const transactionId = formData.get("transactionId") as string; // Get the transaction ID from form data

  // Fetch the invoice to get the value
  const invoice = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, Number.parseInt(invoiceId)))
    .execute();

  const invoiceData = invoice[0]; // Access the first element of the array
  if (!invoiceData) {
    throw new Error("Invoice not found");
  }

  const amount = invoiceData.value / 100; // Convert back to original amount

  try {
    const paymentResponse = await initiatePayment(amount, transactionId); // Pass the transaction ID
    console.log("Payment response:", paymentResponse); 
    return paymentResponse; // Return the full response from the payment API
  } catch (error) {
    console.error("Payment error:", error);
    throw new Error("Payment initiation failed");
  }
}


// export async function updateStatusAction(formData: FormData) {
//   const { userId } = auth();

//   if (!userId) {
//     return;
//   }

//   const id = formData.get('id') as string;
//   const status = formData.get('status') as Status;
    
//   const results = await db.update(Invoices)
//     .set({ status })
//     .where(and(
//       eq(Invoices.id, parseInt(id)),
//       eq(Invoices.userId, userId)
//     ))

//   revalidatePath(`/invoices/${id}`, 'page')

//   console.log(results)
// }

// export async function deleteInvoiceAction(formData: FormData) {
//   const { userId } = auth();

//   if (!userId) {
//     return;
//   }

//   const id = formData.get('id') as string;
    
//   const results = await db.delete(Invoices)
//     .where(and(
//       eq(Invoices.id, parseInt(id)),
//       eq(Invoices.userId, userId)
//     ))

//   redirect('/dashboard')

//   console.log(results)
// }
