import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex justify-center items-center w-full">
    <div className="flex flex-col gap-4 max-w-5xl">
    <h1 className="lg:text-7xl text-3xl md:text-6xl font-extrabold mx-auto">Invoicing Made <span className="gradient-text w-20 h-20">Simple.</span></h1>

    <p className="hidden md:block text-center max-w-md md:max-w-2xl">
    We create invoice management solutions that drive efficiency and growth. With beautifully designed interfaces and powerful features, Invoicegen simplifies your billing process, allowing you to focus on what truly matters—your business. Our platform is the perfect foundation for
    <span className="mx-auto" > managing your invoices seamlessly and effectively.</span>
    </p>

    <p className="md:hidden text-center max-w-sm md:max-w-2xl">
    We create invoice management solutions that drive efficiency and growth. With beautifully designed interfaces and powerful features, Invoicegen simplifies your billing process, allowing you to focus on what truly matters—your business.
    </p>
      <Button className="w-28 mt-5 mx-auto">
     <Link href="/dashboard">Sign In</Link>
      </Button>
    </div>
    </main>
   
  );
}
