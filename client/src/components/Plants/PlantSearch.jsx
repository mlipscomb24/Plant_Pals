import React, { useState } from "react";
import {
  Input,
  List,
  Image,
  Segment,
  Message,
  Button,
} from "semantic-ui-react";
import API from "../../utils/api";

const PlantSearch = ({ onSelectPlant }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const results = await API.searchPlants(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError("Failed to fetch plant data. Please try again.");
      console.error("Search error:", err);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
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
          onClick: handleSearch,
          loading: loading,
          disabled: loading,
        }}
      />
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      {searchResults.length > 0 && (
        <List divided relaxed style={{ marginTop: "20px" }}>
          {searchResults.map((plant) => (
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
