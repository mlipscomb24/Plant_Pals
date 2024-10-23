import React from "react";
import NotificationButton from "../components/Dashboard/NotificationButton";
import { Segment, Grid, Image, Header, Button } from "semantic-ui-react";

const UserHeader = ({ user, gamificationStatus, onGenerateAvatar }) => {
  const { currentTier, plantCount } = gamificationStatus || {
    currentTier: "Seedling",
    plantCount: 0,
  };

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
            <NotificationButton />
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
    </Segment>
  );
};

export default UserHeader;
