import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Form, Button, Header, Segment, Message } from "semantic-ui-react";
import Auth from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.token;
      Auth.login(token);
      navigate("/profile");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Segment padded="very">
      <Header as="h2" color="teal" textAlign="center">
        Log in to Plant Pals
      </Header>
      {error && (
        <Message negative>
          <Message.Header>Login Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Form onSubmit={handleFormSubmit} loading={loading}>
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
          style={{ backgroundColor: "#fb923c", color: "white" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <Button
        as={Link}
        to="/"
        color="grey"
        fluid
        size="large"
        style={{ marginTop: "1em" }}
      >
        Cancel
      </Button>
      <Link to="/signup">Sign up here</Link>
    </Segment>
  );
};

export default Login;
