import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Modal, Container, Icon } from "semantic-ui-react";

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
            }} // Updated size, weight, spacing, and color
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
                }}
              >
                About Us
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Modal
        open={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        size="small"
        style={{ borderRadius: "10px" }} // Rounded corners
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
