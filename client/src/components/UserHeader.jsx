import React, { useState } from "react";
import InstallButton from "../components/Dashboard/InstallButton";
import NotificationButton from "../components/Dashboard/NotificationButton";
import ScheduleForm from "../components/Dashboard/ScheduleForm";
import TestButton from "../components/Dashboard/TestButton";
import { Button, Segment, Grid, Image, Header, Modal } from "semantic-ui-react";

const UserHeader = ({ user, gamificationStatus, onGenerateAvatar }) => {
  const { currentTier, plantCount } = gamificationStatus || {
    currentTier: "Seedling",
    plantCount: 0,
  }
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  ;

  const getTierImage = (tier) => {
    switch (tier) {
      case "Pro_Botanist":
        return "/images/Pro_Botanist.jpeg";
      case "gardener":
        return "/images/gardener.jpeg";
      case "Sapling":
        return "/images/Sapling.jpeg";
      case "Sprout":
        return "/images/Sprout.jpeg";
      case "seedlingNew":
      default:
        return "/images/seedlingNew.jpeg";
    }
  };

  const tierImage = getTierImage(currentTier);

  // Try accessing the user's name via 'username', or 'firstName' and 'lastName'
  const userName =
    user?.username || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Image
            src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg"}
            size="small"
            circular
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
              <Button
                onClick={() => setNotifModalOpen(true)}
                size="large"
                style={{
                  backgroundColor: "#7dd3fc",
                  color: "white",
                }}
              >
                Notification Settings
              </Button>
            <Button
              onClick={onGenerateAvatar}
              style={{
                backgroundColor: "#38a169",
                color: "white",
              }}
            >
              Generate New Avatar
            </Button>
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">{userName}'s Plant Collection</Header>
          <Segment>
            <Header as="h3">Your Plant Journey</Header>
            <p>Current Tier: {currentTier}</p>
            <Image src={tierImage} size="small" circular />
            <p>Plants: {plantCount}</p>
          </Segment>
        </Grid.Column>
      </Grid>

      <Modal
        open={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
        size="small"
        style={{ borderRadius: "10px" }} // Rounded corners
      >
        <Modal.Header>Notification Settings</Modal.Header>
        <Modal.Content>
          <Grid columns={1} stackable>
          <Grid.Row>
            <Grid.Column>
          <NotificationButton />
          <InstallButton />
          <TestButton />
          <ScheduleForm />
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => setNotifModalOpen(false)}
            style={{ backgroundColor: "#38a169", color: "white" }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>

    </Segment>

  );
};

export default UserHeader;
