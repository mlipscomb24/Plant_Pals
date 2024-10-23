import React from "react";
import { Card, Message } from "semantic-ui-react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, onDeletePlant }) => {
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
            onDelete={() => onDeletePlant(plant)} // Use onDeletePlant prop
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default PlantList;
