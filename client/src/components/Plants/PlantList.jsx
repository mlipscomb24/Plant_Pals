import React from "react";
import { Card, Message, Button } from "semantic-ui-react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, onAddPlant, onDeletePlant }) => {
  if (plants.length === 0) {
    return <Message info>No plants to display</Message>;
  }

  return (
    <div>
      <Card.Group doubling itemsPerRow={3} stackable>
        {plants.map((plant) => (
          <PlantCard
            key={plant._id}
            plant={plant}
            onAction={onAddPlant ? () => onAddPlant(plant) : null}
            actionText={onAddPlant ? "Add Plant" : null}
            actionColor={onAddPlant ? "green" : null}
            onDelete={onDeletePlant ? () => onDeletePlant(plant) : null}
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default PlantList;
