import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    payment_status,
    customer_email,
    metadata,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {

    console.log({status, payment_intent, payment_status, customer_email, metadata});

    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customer_email}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
}

// import { stripe } from "@/lib/stripe";
// import { redirect } from "next/navigation";

// type SuccessPageProps = {
//   searchParams: Promise<{
//     session_id?: string;
//   }>;
// };

// export default async function Success({ searchParams }: SuccessPageProps) {
//   const { session_id } = await searchParams;

//   if (!session_id) {
//     throw new Error("Please provide a valid session_id (`cs_test_...`)");
//   }

//   const session = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ["line_items", "payment_intent"],
//   });

//   const { status, customer_details } = session;
//   const customerEmail = customer_details?.email;

//   if (status === "open") {
//     redirect("/");
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <h1>Payment Successful!</h1>

//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customerEmail || "your registered email"}.
//         </p>

//         <p>
//           If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }

//   return null;
// }
