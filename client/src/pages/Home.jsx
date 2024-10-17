import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Button, Segment, Image } from "semantic-ui-react";

const Home = () => (
  <Container fluid>
    <Segment
      vertical
      textAlign="center"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Changed from center to flex-start
        padding: "4em 0em", // Increased top padding
        background: "white",
        color: "#ffffff",
      }}
    >
      <Image
        src="/images/Plant_Pals.jpeg"
        size="large" // Changed from medium to large
        centered
        style={{
          marginTop: "2em", // Added top margin
          marginBottom: "2em",
          maxWidth: "400px", // Increased max width
          height: "auto",
        }}
      />
      <Header
        as="h1"
        content="Welcome to Plant Pals"
        style={{
          fontSize: "3.5em",
          marginBottom: "0.5em",
          color: "#4ade80",
        }}
      />
      <Header
        as="h2"
        content="Keep your plants healthy and happy!"
        style={{
          fontSize: "1.5em",
          marginTop: "0.5em",
          marginBottom: "1.5em",
          color: "#7dd3fc",
        }}
      />
      <div>
        <Button
          as={Link}
          to="/signup"
          size="huge"
          style={{
            marginTop: "1em",
            backgroundColor: "#f472b6",
            color: "white",
          }}
        >
          Sign Up
        </Button>
        <Button
          as={Link}
          to="/login"
          size="huge"
          style={{
            marginTop: "1em",
            marginLeft: "0.5em",
            backgroundColor: "#fb923c",
            color: "white",
          }}
        >
          Login
        </Button>
      </div>
    </Segment>
  </Container>
);

export default Home;
