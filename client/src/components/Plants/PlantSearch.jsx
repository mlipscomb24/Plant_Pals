import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Grid,
  Segment,
  Input,
  Message,
  List,
  Image,
  Button,
} from "semantic-ui-react";
import Auth from "../../utils/auth";
import { SEARCH_PLANTS } from "../../utils/queries";
import { ADD_PLANT } from "../../utils/mutations";

const PlantSearch = ({ refetchUserPlants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addError, setAddError] = useState("");

  const { loading, error, data } = useQuery(SEARCH_PLANTS, {
    variables: { searchTerm },
    skip: searchTerm.length < 3,
  });

  const [addPlant] = useMutation(ADD_PLANT, {
    onCompleted: () => refetchUserPlants(),
    onError: (error) => setAddError(error.message),
  });

  const handleAddPlant = async (plant) => {
    if (!Auth.loggedIn()) {
      setAddError("Please log in to add plants");
      return;
    }

    try {
      await addPlant({
        variables: {
          plantData: {
            name: plant.name,
            species: plant.species,
            waterFrequency: plant.waterFrequency,
            sunlightNeeds: plant.sunlightNeeds,
            image_url: plant.image_url,
          },
        },
      });
    } catch (err) {
      console.error("Error adding plant:", err);
      setAddError("Failed to add plant. Please try again.");
    }
  };

  return (
    <Segment>
      <Input
        fluid
        placeholder="Search plants (minimum 3 characters)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon="search"
        loading={loading}
      />
      {error && (
        <Message negative header="Search Error" content={error.message} />
      )}
      {addError && (
        <Message negative header="Add Plant Error" content={addError} />
      )}
      {data?.searchPlants?.length > 0 && (
        <List divided relaxed>
          {data.searchPlants.map((plant) => (
            <List.Item key={plant._id || plant.name}>
              <Grid>
                <Grid.Column width={2}>
                  <Image
                    avatar
                    src={plant.image_url || "/placeholder-plant.jpg"}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <List.Content>
                    <List.Header>{plant.name}</List.Header>
                    <List.Description>{plant.species}</List.Description>
                    <List.Description>
                      Water: {plant.waterFrequency || "Not specified"}
                      <br />
                      Sunlight: {plant.sunlightNeeds || "Not specified"}
                    </List.Description>
                  </List.Content>
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                  <Button
                    primary
                    onClick={() => handleAddPlant(plant)}
                    disabled={!Auth.loggedIn()}
                  >
                    Add Plant
                  </Button>
                </Grid.Column>
              </Grid>
            </List.Item>
          ))}
        </List>
      )}
    </Segment>
  );
};

export default PlantSearch;
