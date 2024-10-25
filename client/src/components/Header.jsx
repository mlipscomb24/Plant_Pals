import React, { useState } from "react";
import { Link } from "react-router-dom"; // We don't need useNavigate since AuthService handles redirect
import { Menu, Button, Modal, Container, Icon } from "semantic-ui-react";
import Auth from "../utils/auth"; // Import your AuthService

const Header = () => {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <>
      <Menu
        inverted
        fixed="top"
        size="large"
        style={{ minHeight: "80px", backgroundColor: "#2d3748" }}
      >
        <Container>
          <Menu.Item
            as={Link}
            to="/"
            header
            style={{
              padding: "0 20px",
              fontSize: "1.8em",
              fontWeight: "bold",
              letterSpacing: "0.05em",
              color: "#38a169",
            }}
          >
            <Icon name="leaf" color="green" />
            Plant Pals
          </Menu.Item>
          <Menu.Item>
            <Button
              as={Link}
              to="/plantcare"
              size="large"
              style={{
                backgroundColor: "#f472b6",
                color: "white",
                marginRight: "1em",
              }}
            >
              Plant Care
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              as={Link}
              to="/profile"
              size="large"
              style={{
                backgroundColor: "#fb923c",
                color: "white",
                marginRight: "1em",
              }}
            >
              Profile
            </Button>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                onClick={() => setAboutModalOpen(true)}
                size="large"
                style={{
                  backgroundColor: "#7dd3fc",
                  color: "white",
                  marginRight: "1em",
                }}
              >
                About Us
              </Button>
            </Menu.Item>
            {Auth.loggedIn() && ( // Only show logout when user is logged in
              <Menu.Item>
                <Button
                  onClick={() => Auth.logout()}
                  size="large"
                  style={{
                    backgroundColor: "#ef4444", // Red color for logout
                    color: "white",
                  }}
                >
                  Logout
                </Button>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Container>
      </Menu>

      <Modal
        open={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        size="small"
        style={{ borderRadius: "10px" }}
      >
        <Modal.Header>About Plant Pals</Modal.Header>
        <Modal.Content>
          <p>
            Plant Pals is your go-to app for all things plant care. We're
            passionate about helping you keep your green friends happy and
            healthy!
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => setAboutModalOpen(false)}
            style={{ backgroundColor: "#38a169", color: "white" }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Header;
