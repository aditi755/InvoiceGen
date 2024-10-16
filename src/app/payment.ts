// src/app/payment.ts
"use server";

// const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"; // Updated URL
// const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID; // Use environment variable
// const SALT_KEY = process.env.NEXT_PUBLIC_SALT_KEY; // Use environment variable

const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT"; // Replace with your actual Merchant ID
//const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"; // Replace with your actual Salt Key

export async function initiatePayment(amount: number, transactionId: string) {
  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: transactionId,
    amount: amount,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  try {
    const response = await fetch(PHONEPE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.success) {
      return { success: true, paymentId: data.paymentId }; // Adjust based on actual response structure
    } else {
      throw new Error(data.message || "Payment initiation failed");
    }
  } catch (error) {
    console.error("Payment error:", error);
    throw new Error("Payment initiation failed");
  }
}
