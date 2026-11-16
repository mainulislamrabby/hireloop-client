const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const paymentVerify = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });
  return response.json();
};
