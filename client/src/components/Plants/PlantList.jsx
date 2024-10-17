import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PLANTS } from "../../utils/queries";
import { Card, Message } from "semantic-ui-react";
import PlantItem from "./PlantItem";

const PlantList = ({ onDelete }) => {
  const { loading, error, data } = useQuery(GET_PLANTS);

  if (loading) return <Message info>Loading...</Message>;
  if (error) return <Message negative>Error: {error.message}</Message>;

  return (
    <div>
      <h2>My Plants</h2>
      <Card.Group doubling itemsPerRow={3} stackable>
        {data.plants.map((plant) => (
          <PlantItem
            key={plant._id}
            plant={plant}
            onAction={onDelete}
            actionText="Remove Plant"
            actionColor="red"
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default PlantList;
