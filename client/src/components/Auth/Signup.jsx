import React, { useState } from "react";
import { Form, Button, Header, Segment } from "semantic-ui-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <Segment padded="very">
      <Header as="h2" color="teal" textAlign="center">
        Sign Up for Plant Pals
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          icon="mail"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button
          color="teal"
          fluid
          size="large"
          type="submit"
          style={{ backgroundColor: "#f472b6", color: "white" }} // Updated to pink
        >
          Sign Up
        </Button>
      </Form>
      <Button color="grey" fluid size="large" style={{ marginTop: "1em" }}>
        Cancel
      </Button>
    </Segment>
  );
};

export default Signup;
