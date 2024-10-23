import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Segment, Header } from "semantic-ui-react";
import UserHeader from "../components/UserHeader";
import PlantSearch from "../components/Plants/PlantSearch";
import PlantList from "../components/Plants/PlantList";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { DELETE_PLANT, UPDATE_USER_AVATAR } from "../utils/mutations";
import { calculateTier, checkBadges } from "../utils/gamificationUtils";

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [gamificationStatus, setGamificationStatus] = useState({
    currentTier: "Seedling",
    plantCount: 0,
    badges: [],
  });

  const [updateAvatar] = useMutation(UPDATE_USER_AVATAR, {
    onCompleted: () => {
      refetch();
    },
  });

  const [deletePlant] = useMutation(DELETE_PLANT, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to delete plant", error);
    },
  });

  const handleGenerateNewAvatar = async () => {
    try {
      const seed = Math.random().toString(36).substring(7);
      const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
      await updateAvatar({
        variables: { avatarUrl: newAvatarUrl },
      });
    } catch (err) {
      console.error("Failed to update avatar", err);
    }
  };

  const handleDeletePlant = async (plant) => {
    try {
      await deletePlant({
        variables: { plantId: plant._id },
      });
      refetch();
    } catch (err) {
      console.error("Failed to delete plant", err);
    }
  };

  useEffect(() => {
    if (data?.me) {
      const plantCount = data.me.plants?.length || 0;
      const newTier = calculateTier(plantCount);
      const newBadges = checkBadges(data.me);

      setGamificationStatus({
        currentTier: newTier,
        plantCount,
        badges: newBadges,
      });
    }
  }, [data?.me]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <Container>
      <UserHeader
        user={data?.me}
        gamificationStatus={gamificationStatus}
        onGenerateAvatar={handleGenerateNewAvatar}
      />
      <PlantSearch refetchUserPlants={refetch} />
      <Segment>
        <Header as="h2">My Plants</Header>
        <PlantList
          plants={data?.me?.plants || []}
          onDeletePlant={handleDeletePlant}
          title="My Plants"
        />
      </Segment>
    </Container>
  );
};

export default Profile;
