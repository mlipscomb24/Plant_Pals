import React from "react";
import { Card, Image, Button, Message } from "semantic-ui-react";
import Auth from "../../utils/auth";

const PlantCard = ({ plant, onAction, actionText, actionColor, onDelete }) => {
  const isAuthenticated = Auth.loggedIn();

  return (
    <Card>
      <Image
        src={plant.image_url || "/placeholder-plant.jpg"}
        wrapped
        ui={false}
        alt={plant.name || "Plant image"}
      />
      <Card.Content>
        <Card.Header>{plant.name || "Unnamed Plant"}</Card.Header>
        <Card.Meta>
          {plant.species || "Species information not available"}
        </Card.Meta>
        <Card.Description>
          Water: {plant.waterFrequency || "Watering information not available"}
          <br />
          Sunlight:{" "}
          {plant.sunlightNeeds || "Sunlight information not available"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {!isAuthenticated && (
          <Message size="tiny" warning>
            Login to manage plants
          </Message>
        )}
        {isAuthenticated && (
          <>
            {onAction && (
              <Button basic color={actionColor} onClick={() => onAction(plant)}>
                {actionText}
              </Button>
            )}
            {onDelete && (
              <Button basic color="red" onClick={() => onDelete(plant)}>
                Delete
              </Button>
            )}
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default PlantCard;
