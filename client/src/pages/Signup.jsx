import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Form, Button, Header, Segment, Message } from "semantic-ui-react";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");

  const [createUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      const token = data.createUser.token;
      Auth.login(token);
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Signup error:", error);
      setError(error.message);
    },
  });

const handleFormSubmit = async (event) => {
  event.preventDefault();
  setError(""); // Clear any existing errors

  try {
    const { data } = await createUser({
      variables: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
    });

    if (data && data.createUser) {
      const token = data.createUser.token;
      Auth.login(token);
      navigate("/profile");
    }
  } catch (err) {
    console.error("Signup error:", err);
    setError(err.message);
  }
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Segment padded="very">
      <Header as="h2" color="teal" textAlign="center">
        Sign Up for Plant Pals
      </Header>
      {error && (
        <Message negative>
          <Message.Header>Signup Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Form onSubmit={handleFormSubmit} loading={loading}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="First Name"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
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
          minLength="5"
        />
        <Button
          color="teal"
          fluid
          size="large"
          type="submit"
          style={{ backgroundColor: "#f472b6", color: "white" }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>
      <Button
        fluid
        size="large"
        style={{ marginTop: "1em" }}
        onClick={() => navigate("/")}
      >
        Cancel
      </Button>
    </Segment>
  );
}

export default Signup;
