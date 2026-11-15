import Checkout from "@/components/payment/Checkout";

type CheckoutPageProps = {
  searchParams: Promise<{
    canceled?: string;
    plan?: string;
  }>;
};

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const { canceled, plan } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready.",
    );
  }

  return <Checkout canceled={canceled} plan={plan} />;
};

export default CheckoutPage;
