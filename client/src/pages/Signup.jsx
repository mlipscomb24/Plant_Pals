import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button, Header, Segment } from 'semantic-ui-react'; 

function Signup(props) {
  const [formData, setFormData] = useState({ 
    email: '',
    password: '',
    confirmPassword: '',
  });
  // add validation to ensure passwords match})
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
  });
  const token = mutationResponse.data.addUser.token;
  Auth.login(token);
};
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData, 
    [name]: value 
  });
  };

  return (
    <Segment padded="very">
    <Header as="h2" color="teal" textAlign="center">
      Sign Up for Plant Pals
    </Header>
    <Form onSubmit={handleFormSubmit}>
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
    <Link to='/login'> Already Registered? Login here </Link>
  </Segment>
  );
};

export default Signup;
