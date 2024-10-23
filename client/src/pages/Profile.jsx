import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Segment, Header } from "semantic-ui-react";
import UserHeader from "../components/UserHeader";
import PlantSearch from "../components/Plants/PlantSearch";
import PlantList from "../components/Plants/PlantList";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { DELETE_PLANT } from "../utils/mutations"; // Import the delete mutation
import { calculateTier, checkBadges } from "../utils/gamificationUtils"; // Import the utils

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [gamificationStatus, setGamificationStatus] = useState({
    currentTier: "Seedling",
    plantCount: 0,
    badges: [],
  });

  const [deletePlant] = useMutation(DELETE_PLANT, {
    onCompleted: () => {
      refetch(); // Refetch to update the list after deleting a plant
    },
    onError: (error) => {
      console.error("Failed to delete plant", error);
    },
  });

  // Handle plant deletion
 const handleDeletePlant = async (plant) => {
   try {
     // Ensure we are passing only the _id of the plant, not the entire plant object
     await deletePlant({
       variables: { plantId: plant._id },
     });
     refetch(); // Refetch the user data after deletion
   } catch (err) {
     console.error("Failed to delete plant", err);
   }
 };


  // Update gamification status based on plant count changes
  useEffect(() => {
    if (data?.me?.plants) {
      const plantCount = data.me.plants.length;
      const newTier = calculateTier(plantCount); // Calculate the new tier
      const newBadges = checkBadges(data.me); // Check for new badges

      setGamificationStatus({
        currentTier: newTier,
        plantCount,
        badges: newBadges,
      });
    }
  }, [data?.me?.plants]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <Container>
      <UserHeader user={data?.me} gamificationStatus={gamificationStatus} />
      <PlantSearch refetchUserPlants={refetch} />
      <Segment>
        <Header as="h2">My Plants</Header>
        <PlantList
          plants={data?.me?.plants || []}
          onDeletePlant={handleDeletePlant} // Pass the delete handler
          title="My Plants"
        />
      </Segment>
    </Container>
  );
};

export default Profile;
