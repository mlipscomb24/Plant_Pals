import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const PlantCard = ({ plant, onAction, actionText, actionColor, onDelete }) => (
  <Card>
    <Image
      src={plant.image_url || "/placeholder-plant.jpg"}
      wrapped
      ui={false}
      alt={plant.name || "Plant image"}
    />
    <Card.Content>
      <Card.Header>{plant.name || "Unnamed Plant"}</Card.Header>{" "}
      {/* Use `name` */}
      <Card.Meta>
        {plant.species || "Species information not available"}{" "}
        {/* Use `species` */}
      </Card.Meta>
      <Card.Description>
        Water: {plant.waterReminder || "Watering information not available"}
        <br />
        Sunlight: {plant.sunlightNeeds || "Sunlight information not available"}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
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
    </Card.Content>
  </Card>
);

export default PlantCard;
