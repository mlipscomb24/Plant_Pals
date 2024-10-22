import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Input,
  List,
  Image,
  Segment,
  Message,
  Button,
} from "semantic-ui-react";

// GraphQL query for plant search
const SEARCH_PLANTS = gql`
  query SearchPlants($searchTerm: String!) {
    searchPlants(searchTerm: $searchTerm) {
      _id
      name
      species
      waterFrequency
      sunlightNeeds
      image_url
    }
  }
`;

const PlantSearch = ({ onSelectPlant }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Execute the searchPlants query when the searchTerm changes
  const { loading, error, data } = useQuery(SEARCH_PLANTS, {
    variables: { searchTerm },
    skip: searchTerm.length < 3, // Skip the query until the search term is long enough
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.length >= 3) {
      // Manually trigger search if needed
    }
  };

  return (
    <Segment>
      <Input
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        action={{
          icon: "search",
          loading: loading,
          disabled: loading,
        }}
      />
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error.message}</p>
        </Message>
      )}
      {data?.searchPlants?.length > 0 && (
        <List divided relaxed style={{ marginTop: "20px" }}>
          {data.searchPlants.map((plant) => (
            <List.Item key={plant._id}>
              <Image avatar src={plant.image_url || "/placeholder-plant.jpg"} />
              <List.Content>
                <List.Header>{plant.name}</List.Header>
                <List.Description>{plant.species}</List.Description>
              </List.Content>
              <Button
                primary
                floated="right"
                onClick={() => onSelectPlant(plant)}
              >
                Add Plant
              </Button>
            </List.Item>
          ))}
        </List>
      )}
    </Segment>
  );
};

export default PlantSearch;
