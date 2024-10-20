import React, { useState, useEffect, useCallback } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import UserHeader from "../components/UserHeader";
import PlantSearch from "../components/Plants/PlantSearch";
import PlantList from "../components/Plants/PlantList";
import axios from "axios";

const Profile = () => {
  const [user] = useState({
    name: "John Doe",
    avatar: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    id: "123",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [myPlants, setMyPlants] = useState([
    {
      _id: "1",
      name: "Monstera",
      species: "Monstera deliciosa",
      waterReminder: "Water when top 2-3 inches of soil are dry",
      sunlightNeeds: "Bright indirect light",
      image: "https://example.com/monstera.jpg",
    },
  ]);
  const [gamificationStatus, setGamificationStatus] = useState({
    currentTier: "Seedling",
    plantCount: myPlants.length,
    badges: [],
  });

  const updateGamificationStatus = useCallback(() => {
    setGamificationStatus((prevStatus) => ({
      ...prevStatus,
      plantCount: myPlants.length,
    }));
  }, [myPlants.length]);

  useEffect(() => {
    updateGamificationStatus();
  }, [myPlants, updateGamificationStatus]);

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`/api/plants?query=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching plants:", error);
    }
  };

  const handleAddPlant = (plant) => {
    const newPlant = {
      _id: Date.now().toString(),
      name: plant.name || plant.common_name || plant.scientific_name,
      species: plant.scientific_name || "Unknown",
      image_url: plant.image_url || "/placeholder-plant.jpg",
      waterReminder:
        plant.waterFrequency || "Watering information not available",
      sunlightNeeds:
        plant.sunlightNeeds || "Sunlight information not available",
    };
    setMyPlants((prevPlants) => [...prevPlants, newPlant]);
    updateGamificationStatus();
  };

  const handleDeletePlant = (plant) => {
    const updatedPlants = myPlants.filter((p) => p._id !== plant._id);
    setMyPlants(updatedPlants);
  };

  return (
    <Container>
      <UserHeader user={user} gamificationStatus={gamificationStatus} />
      <PlantSearch onSelectPlant={handleAddPlant} />
      <Segment>
        <Header as="h2">Search Results</Header>
        <PlantList
          plants={searchResults}
          onAddPlant={handleAddPlant}
          title="Search Results"
        />
        <Header as="h3">My Plants</Header>
        <PlantList
          plants={myPlants}
          onDeletePlant={handleDeletePlant}
          title="My Plants"
        />
      </Segment>
    </Container>
  );
};

export default Profile;
