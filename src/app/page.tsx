import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
    <div className="flex flex-col gap-4">
    <h1 className="text-4xl font-bold">Invoicepedia</h1>
    <Button className="w-28 mx-auto">
     <Link href="/dashboard">Sign In</Link>
      </Button>
    </div>
    </main>
   
  );
}
