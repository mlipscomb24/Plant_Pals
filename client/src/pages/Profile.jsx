import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Segment, Header } from "semantic-ui-react";
import UserHeader from "../components/UserHeader";
import PlantSearch from "../components/Plants/PlantSearch";
import PlantList from "../components/Plants/PlantList";
import axios from "axios";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";

const Profile = () => {
  // All hooks must be declared at the top level
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [searchResults, setSearchResults] = useState([]);
  const [gamificationStatus, setGamificationStatus] = useState({
    currentTier: "Seedling",
    plantCount: 0,
    badges: [],
  });

  // Access user data from query
  const userData = data?.me || {};

  // useEffect must be declared before any conditional returns
  useEffect(() => {
    if (userData.plants) {
      setGamificationStatus((prevStatus) => ({
        ...prevStatus,
        plantCount: userData.plants.length,
      }));
    }
  }, [userData.plants]);

  // Auth check can come after hooks
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

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
    // Update your backend here
    refetch(); // Refetch user data after adding plant
  };

  const handleDeletePlant = async (plantId) => {
    try {
      // Add your delete mutation here
      refetch(); // Refetch user data after deletion
    } catch (err) {
      console.error("Error deleting plant:", err);
    }
  };

  return (
    <Container>
      <UserHeader user={userData} gamificationStatus={gamificationStatus} />
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
          plants={userData.plants || []}
          onDeletePlant={handleDeletePlant}
          title="My Plants"
        />
      </Segment>
    </Container>
  );
};

export default Profile;
