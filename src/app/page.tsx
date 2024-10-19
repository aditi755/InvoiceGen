import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex justify-center items-center  w-full gradient-bg">
    <div className="flex flex-col gap-4 max-w-5xl">
    <h1 className="lg:text-7xl text-3xl md:text-6xl font-extrabold mx-auto mt-10">Invoicing Made <span className="gradient-text w-20 h-20">Simple.</span></h1>
 
 
    <p className="hidden md:block text-center mx-auto md:max-w-2xl">
    Streamline your billing with InvoiceGen – Beautifully designed and packed with powerful features, we simplify invoice management so you can focus on growing your business.
    </p>

    <p className="md:hidden text-center mx-auto  max-w-sm ">
    Streamline your billing with InvoiceGen – Beautifully designed and packed with powerful features, we simplify invoice management so you can focus on growing your business.
    </p>

      <Button className="w-28 mt-5 mx-auto">
     <Link href="/dashboard">Sign In</Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mx-auto mb-20 mt-10 px-2 md:px-8">
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400">
        <h2 className="text-black font-bold">Effortless Invoice Management</h2>
        <p className="text-gray-600 mt-2">Track, update, and manage invoices in various states like paid, void, or open—all in real-time.</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400 ">
        <h2 className="text-black font-bold">Integrated PhonePe Payments</h2>
        <p className="text-gray-600 mt-2">Enable seamless and secure payments through PhonePe, with instant tracking of payment statuses.</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400 ">
        <h2 className="text-black font-bold">Beautifully Designed Interface</h2>
        <p className="text-gray-600 mt-2">Experience a modern, responsive dashboard with a focus on usability, built with Shadcn UI and Tailwind CSS.</p>
      </div>
    </div>


    <Footer />
    </div>
    </main>
   
  );
}
