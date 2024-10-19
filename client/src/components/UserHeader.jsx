import React from "react";
import { Segment, Grid, Image, Header } from "semantic-ui-react";

const UserHeader = ({ user, gamificationStatus }) => {
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

  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Image src={user.avatar} size="small" circular />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h2">{user.name}'s Plant Collection</Header>
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
