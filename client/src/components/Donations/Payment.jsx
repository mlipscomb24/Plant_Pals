import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "../../pages/DonationForm";

function Payment({ amount, setAmount }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the Stripe publishable key from your server
    fetch("/config")
      .then(async (r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch Stripe config");
        }
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Error fetching Stripe config:", error);
        setError("Failed to load payment gateway. Please try again later.");
      });
  }, []);

  useEffect(() => {
    if (amount > 0) {
      // Create a Payment Intent on the server
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to create payment intent");
          }
          const { clientSecret } = await res.json();
          setClientSecret(clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setError("Failed to initiate donation. Please try again later.");
        });
    }
  }, [amount]);

  if (error) {
    return <div>{error}</div>;
  }

  const appearance = {
    theme: 'stripe', // Stripe ui:'stripe', 'flat', 'night', 'none'
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
    },
    rules: {
      '.Label': {
        color: '#30313d',
      },
    },
  };

  return (
    <>
      <h1>Donations To Plant Pals</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        
        </Elements>
      )}
    </>
  );
}

export default Payment;