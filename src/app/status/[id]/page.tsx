"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handlePaymentStatus } from '../../payment'; // Adjust the import path as necessary

const StatusPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Get the transaction ID from the URL parameters
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      setLoading(true);
      try {
        const statusResponse = await handlePaymentStatus(id);
        if (statusResponse.success) {
          // Handle successful payment status
          console.log("Payment was successful:", statusResponse);
          setMessage("Payment was successful!");
          // Redirect to a success page
          router.push('/success'); // Redirect to a success page
        } else {
          // Handle failed payment status
          console.log("Payment failed:", statusResponse);
          setMessage("Payment failed. Please try again.");
          // Optionally redirect to a failure page
          router.push('/failure'); // Redirect to a failure page
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setMessage("Error checking payment status. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [id, router]); // Include router in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking
  }

  return (
    <div>
      <h1>Payment Status</h1>
      {message ? <p>{message}</p> : <p>No status available.</p>}
    </div>
  );
};

export default StatusPage;
