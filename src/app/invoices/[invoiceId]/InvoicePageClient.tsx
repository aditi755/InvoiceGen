"use client"

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ChevronDown, Trash2 } from "lucide-react";
import { AVAILABLE_STATUSES } from '@/data/invoice';
import { updateStatusAction, deleteInvoiceAction } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
//import { payInvoiceAction } from "@/app/actions"; // Adjust the import path as necessary


// Update the interface
interface InvoiceData {
  id: number;
  status: string;
  value: number;
  description: string;
  customer: {
    name: string;
    email: string;
  };
}

function InvoicePageClient({ invoiceData }: { invoiceData: InvoiceData }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStatusUpdate = async (e: React.MouseEvent, status: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', invoiceData.id.toString());
    formData.append('status', status);
    
    await updateStatusAction(formData);
    router.refresh();
  };


  // async function PayInvoiceButton ({ invoiceId }: { invoiceId: number }) { // Specify the type of invoiceId
  //   // const handlePayInvoice = async () => {
  //     const formData = new FormData();
  //     formData.append("invoiceId", invoiceId.toString()); // Convert invoiceId to string
  
  //     try {
  //       const result = await payInvoiceAction(formData);
  //       if (result.success) {
  //         console.log("Payment initiated:", result.paymentId);
  //       } else {
  //         console.error("Payment failed:");
  //       }
  //     } catch (error) {
  //       console.error("Error initiating payment:", error);
  //     }
  // //};
  // }

  return (
    <Container className="max-w-4xl h-screen mx-12 sm:mx-26 lg:mx-42 xl:mx-72">
    <main className="max-h-screen flex flex-col gap-6 max-w-6xl mx-auto my-12">  
      <h1 className="flex items-center gap-4 text-3xl font-semibold">
        Invoice {invoiceData.id}
        <Badge
          className={cn(
            "rounded-full capitalize",
            invoiceData.status === "open" && "bg-blue-500",
            invoiceData.status === "paid" && "bg-green-600",
            invoiceData.status === "void" && "bg-zinc-700",
            invoiceData.status === "uncollectible" && "bg-red-600",
          )}
        >
          {invoiceData.status}
        </Badge>
      </h1>

      <div className="flex flex-col justify-between">
        <h2 className="font-bold text-2xl ">Billing Details</h2>
        <div className="flex flex-col gap-2">
          <p className='mt-4'>Value: ${invoiceData.value / 100}</p>
          <p>Customer: {invoiceData.customer.name}</p>
          <p>Email: {invoiceData.customer.email}</p>
          <p>Description: {invoiceData.description}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button
              className="flex items-center gap-2 mt-4"
              variant="outline"
              type="button"
            >
              Change Status
              <ChevronDown className="w-4 h-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-[800px]">
            {AVAILABLE_STATUSES.map((status) => (
              <DropdownMenuItem 
                key={status.id} 
                onSelect={(e) => handleStatusUpdate(e as unknown as React.MouseEvent, status.id)} // Cast to unknown first
              >
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button variant="outline" className="mt-4 mr-[900px]">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Delete Invoice?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete
                your invoice and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form
                className="flex justify-center"
                onSubmit={async (e) => {
                  e.preventDefault();
                  console.log(e.currentTarget);
                  await deleteInvoiceAction(new FormData(e.currentTarget));
                  setIsDialogOpen(false);
                }}
              >
                <input type="hidden" name="id" value={invoiceData.id} />
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  type="submit"
                >
                  <Trash2 className="w-4 h-auto" />
                  Confirm Delete
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* <button onClick={() => PayInvoiceButton({ invoiceId: invoiceData.id })}>
          Pay Invoice
        </button> */}
      </div> 


    </main>
    </Container >
  );
}

export default InvoicePageClient;
