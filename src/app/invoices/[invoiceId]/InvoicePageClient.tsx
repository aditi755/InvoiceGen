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
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import { AVAILABLE_STATUSES } from '@/data/invoice';
import { updateStatusAction, deleteInvoiceAction } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Add this interface above the component or in a separate types file
interface InvoiceData {
  id: number;
  status: string;
  value: number;
  description: string;
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

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">  
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
        <h2>Billing Details</h2>
        <div>
          <p>Value: ${invoiceData.value / 100}</p>
          <p>Description: {invoiceData.description}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center gap-2 mt-4"
              variant="outline"
              type="button"
            >
              Change Status
              <ChevronDown className="w-4 h-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {AVAILABLE_STATUSES.map((status) => (
              <DropdownMenuItem key={status.id} onSelect={(e) => handleStatusUpdate(e, status.id)}>
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">
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
                  await deleteInvoiceAction(new FormData(e.currentTarget));
                  setIsDialogOpen(false);
                  router.push('/invoices');
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
      </div> 
    </main>
  );
}

export default InvoicePageClient;
