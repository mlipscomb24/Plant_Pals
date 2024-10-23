
import React, { useState, useEffect } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import Payment from "../components/Donations/Payment"; // Correct import path

const Donation = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the clientSecret from your backend
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <Container>
      <Segment>
        <Header as="h1">Donate to Plant Pals</Header>
        {clientSecret && <Payment />}
      </Segment>
    </Container>
  );
};

export default Donation;