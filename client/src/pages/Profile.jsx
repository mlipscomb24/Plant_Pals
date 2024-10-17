import React, { useState } from "react";
import { Container, Segment, Header, Card } from "semantic-ui-react";
// Import these when ready to connect to the server
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_PLANTS, SEARCH_PLANTS } from "../components/utils/queries";
// import { ADD_PLANT, DELETE_PLANT } from "../components/utils/mutations";
import UserHeader from "../components/UserHeader";
import PlantSearch from "../components/Plants/PlantSearch";
import PlantItem from "../components/Plants/PlantItem";
// import AddPlantForm from "../components/Plants/AddPlantForm";

const Profile = () => {
  const [user] = useState({
    name: "John Doe",
    avatar: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
  });
  const [showAddForm, setShowAddForm] = useState(false);
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
    {
      _id: "2",
      name: "Snake Plant",
      species: "Sansevieria trifasciata",
      waterReminder:
        "Water every 2-3 weeks, allow soil to dry out between waterings",
      sunlightNeeds: "Low to bright indirect light",
      image: "https://example.com/snakeplant.jpg",
    },
    {
      _id: "3",
      name: "Pothos",
      species: "Epipremnum aureum",
      waterReminder: "Water when top inch of soil is dry",
      sunlightNeeds: "Low to bright indirect light",
      image: "https://example.com/pothos.jpg",
    },
  ]);

  // Commented out server-related code
  /*
  const { loading, error, data, refetch } = useQuery(GET_PLANTS);
  const [searchPlants] = useMutation(SEARCH_PLANTS);
  const [addPlant] = useMutation(ADD_PLANT);
  const [deletePlant] = useMutation(DELETE_PLANT);

  const handleSearch = async (term) => {
    const { data } = await searchPlants({ variables: { searchTerm: term } });
    setSearchResults(data.searchPlants);
  };

  const handleAddPlant = async (plant) => {
    await addPlant({ variables: { plantData: plant } });
    refetch();
  };

  const handleDeletePlant = async (plant) => {
    await deletePlant({ variables: { plantId: plant._id } });
    refetch();
  };
  */

  // Temporary handlers for UI testing
  const handleSearch = (term) => {
    const results = [
      {
        _id: "4",
        name: "Fiddle Leaf Fig",
        species: "Ficus lyrata",
        waterReminder: "Water when top inch of soil is dry",
        sunlightNeeds: "Bright indirect light",
        image: "https://example.com/fiddleleaffig.jpg",
      },
      {
        _id: "5",
        name: "Spider Plant",
        species: "Chlorophytum comosum",
        waterReminder: "Water when top inch of soil is dry",
        sunlightNeeds: "Bright indirect to partial shade",
        image: "https://example.com/spiderplant.jpg",
      },
    ];
    setSearchResults(results);
  };

  const handleAddPlant = (plant) => {
    setMyPlants([...myPlants, { ...plant, _id: Date.now().toString() }]);
  };

  const handleDeletePlant = (plant) => {
    setMyPlants(myPlants.filter((p) => p._id !== plant._id));
  };

  return (
    <Container>
      <UserHeader user={user} />
      <PlantSearch
        onSearch={handleSearch}
        onShowAddForm={() => setShowAddForm(!showAddForm)}
        showAddForm={showAddForm}
      />
      {/* Uncomment when ready to use AddPlantForm */}
      {/* {showAddForm && <AddPlantForm onAdd={handleAddPlant} />} */}
      {searchResults.length > 0 && (
        <Segment>
          <Header as="h3">Search Results</Header>
          <Card.Group>
            {searchResults.map((plant) => (
              <PlantItem
                key={plant._id}
                plant={plant}
                onAction={handleAddPlant}
                actionText="Add to My Plants"
                actionColor="green"
              />
            ))}
          </Card.Group>
        </Segment>
      )}
      <Segment>
        <Header as="h3">My Plants</Header>
        <Card.Group>
          {myPlants.map((plant) => (
            <PlantItem
              key={plant._id}
              plant={plant}
              onAction={handleDeletePlant}
              actionText="Remove Plant"
              actionColor="red"
            />
          ))}
        </Card.Group>
      </Segment>
    </Container>
  );
};

export default Profile;
