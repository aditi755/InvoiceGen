
"use server";

const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT86"; // Replace with your actual Merchant ID 
const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076"; // Replace with your actual Salt Key 

import { createHash } from 'crypto'; 
import axios from 'axios'; 

export async function initiatePayment(amount: number, transactionId: string) {
  try {
    console.log("Transaction ID:", transactionId);

    const data = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: MERCHANT_ID,
      amount: amount * 100,
      redirectUrl: `/status/${transactionId}`, 
      redirectMode: 'POST',
      paymentInstrument: {
        type: 'PAY_PAGE' // This indicates that the payment should be processed through a payment page
      }
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const string = payloadMain + '/pg/v1/pay' + SALT_KEY;
    const sha256 = createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + 1; 

    const response = await axios.post(`${PHONEPE_API_URL}/pg/v1/pay`, {
      request: payloadMain
    }, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      }
    });

    const responseData = response.data;
    console.log("RESPONSE DATA FROM PAYMNEY IS",responseData);
    console.log(responseData.data.instrumentResponse.redirectInfo)
    return responseData; 
  } catch (error) {
    console.error("Payment error:", error);
    throw new Error("Payment initiation failed: " + error);
  }
}

// Payment status handling function
export async function handlePaymentStatus(merchantTransactionId: string) {
  const merchantId = MERCHANT_ID; 

  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + SALT_KEY;
  const sha256 = createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: 'GET',
    url: `${PHONEPE_API_URL}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
    }
  };

  // Check payment status
  try {
    const response = await axios.request(options);
    return response.data; // Return the response data for further processing
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw new Error("Payment status check failed: " + error);
  }
}
