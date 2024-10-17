import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const PlantCard = ({ plant, onAction, actionText, actionColor }) => (
  <Card>
    <Image src={plant.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{plant.name}</Card.Header>
      <Card.Description>
        Water: {plant.waterReminder}
        <br />
        Sunlight: {plant.sunlightNeeds}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button basic color={actionColor} onClick={() => onAction(plant)}>
        {actionText}
      </Button>
    </Card.Content>
  </Card>
);

export default PlantCard;
