import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function DonationForm() {
    const stripe = useStripe();
     const elements=  useElements();
    const [ message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            
            redirect: "if_required",
        },
        });
        if (error.type === "card_error" || error.type === "validation_error"){
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured")
        }
        setIsProcessing(false);
    };
    
        return(
        <form id="donation-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element"/>
            <button disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? "Processing ..." : "Pay now"}
                </span>  
            </button>
            { /* Show any erro or success messages */}
            {message && <div id="payement-message">{message}</div>}
            </form>

    );
}