import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex justify-center items-center  w-full">
    <div className="flex flex-col gap-4 max-w-5xl">
    <h1 className="lg:text-7xl text-3xl md:text-6xl font-extrabold mx-auto mt-10">Invoicing Made <span className="gradient-text w-20 h-20">Simple.</span></h1>
 
 
    <p className="hidden md:block text-center mx-auto md:max-w-2xl">
    We create invoice management solutions that drive efficiency and growth. With beautifully designed interfaces and powerful features, Invoicegen simplifies your billing process, allowing you to focus on your business. 
    </p>

    <p className="md:hidden text-center mx-auto  max-w-sm ">
    We create invoice management solutions that drive efficiency and growth. With beautifully designed interfaces and powerful features, Invoicegen simplifies your billing process, allowing you to focus on what truly matters—your business.
    </p>

      <Button className="w-28 mt-5 mx-auto">
     <Link href="/dashboard">Sign In</Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mx-auto mb-20 mt-10 px-2 md:px-8">
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400">
        <h2 className="text-black font-bold">Customizable Templates</h2>
        <p className="text-gray-600">Easily create and customize invoice templates to match your brand identity, ensuring a professional look for your billing documents.</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400 ">
        <h2 className="text-black font-bold">Automated Reminders</h2>
        <p className="text-gray-600">Set up automated reminders for your clients to ensure timely payments, reducing the hassle of follow-ups and improving cash flow.</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border-2 border-purple-400 ">
        <h2 className="text-black font-bold">Comprehensive Reporting</h2>
        <p className="text-gray-600">Access detailed reports on your invoicing history, helping you track payments, outstanding invoices, and overall financial performance.</p>
      </div>
    </div>


    <Footer />
    </div>
    </main>
   
  );
}
