import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "../components/Donations/DonationForm"; // Correct import path

function Payment(pramount, setAmountops) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the Stripe publishable key from your server
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    // Create a Payment Intent on the server
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>Donations To Plant Pals</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          
          <DonationForm /> {/* Render your donation form */}
        </Elements>
      )}
    </>
  );
}

export default Payment;