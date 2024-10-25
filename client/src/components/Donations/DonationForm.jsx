import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function DonationForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      setMessage(null); // Clear any existing error messages when payment succeeds
    }

    setIsProcessing(false);
  };

  return (
    <form id="donation-form" onSubmit={handleSubmit}>
      <label>
        Donation Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => (e.target.value)}
          min="1"
          required
        />
      </label>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}