import React from 'react'
import { db } from '@/db';
import { Customers, Invoices } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import InvoicePageClient from './InvoicePageClient';

async function getInvoiceData(invoiceId: number) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const [result] = await db.select({
    invoice: Invoices,
    customerName: Customers.name,
    customerEmail: Customers.email,
  }).from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(
        eq(Invoices.id, invoiceId),
        eq(Invoices.userId, userId)
      )
    ).limit(1);

  if (!result) return null;

  return {
    ...result.invoice,
    customer: {
      name: result.customerName,
      email: result.customerEmail,
    }
  };
}

export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error('Invalid invoice Id');
  }

  const invoiceData = await getInvoiceData(invoiceId);

  if (!invoiceData) {
    notFound();
  }

  return <InvoicePageClient invoiceData={invoiceData} />;
}
