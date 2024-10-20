import React from "react";
import { Segment, Header, Image, List } from "semantic-ui-react";

const GamificationStatus = ({ status }) => {
  const { currentTier, plantCount, badges } = status;

  return (
    <Segment>
      <Header as="h3">Your Plant Journey</Header>
      <p>Current Tier: {currentTier}</p>
      <Image src={`/images/${currentTier}.jpeg`} size="small" />
      <p>Plants: {plantCount}</p>
      {badges.length > 0 && (
        <>
          <Header as="h4">Earned Badges</Header>
          <List horizontal>
            {badges.map((badge) => (
              <List.Item key={badge.id}>
                <Image avatar src={badge.image} />
                <List.Content>
                  <List.Header>{badge.name}</List.Header>
                  <List.Description>{badge.description}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </>
      )}
    </Segment>
  );
};

export default GamificationStatus;
