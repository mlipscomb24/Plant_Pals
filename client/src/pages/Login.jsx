import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Button, Header, Segment } from 'semantic-ui-react';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formData.email, password: formData.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
     ...prevState,
      [name]: value,
    }));
  }

  return (
    <Segment padded="very">
      <Header as="h2" color="teal" textAlign="center">
        Log in to Plant Pals
      </Header>
      <Form onSubmit={handleFormSubmit}>
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
          style={{ backgroundColor: "#fb923c", color: "white" }} // Updated to orange
        >
          Login
        </Button>
      </Form>
      <Button color="grey" fluid size="large" style={{ marginTop: "1em" }}>
        Cancel
      </Button>

    <Link to='/signup'> Sign up here</Link> 
    </Segment>
  );
};

export default Login;
