import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
 

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    
    useEffect(()=>{
        fetch("/config").then(async (r) =>{
            const {publishableKey } = await r.jason();

            setStripePromise(loadStripe(publishableKey));
        });
    },[]);

    useEffect(()=>{
        fetch("/create-payment-intent",{
          method: "POST",
          body: JSON.stringify({}),
       } ).then(async (r) =>{
            const {clientSecret } = await r.jason();

            setClientSecret(clientSecret);
        });
    },[]);


    return(
     <>
     <h1>Donations To Plant Pals </h1>
     {stripePromise && clientSecret &&(
        <Elements strpie={stripePromise} options={{clientSecret}}>
      <CheckoutForm />   
    </Elements> 
     )}
      
     
    </>)
    }

    export default Payment;