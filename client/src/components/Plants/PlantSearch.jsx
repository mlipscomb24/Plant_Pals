import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";

const PlantSearch = ({ onSearch, onShowAddForm, showAddForm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Segment>
      <Input
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        action={{ icon: "search", onClick: () => onSearch(searchTerm) }}
      />
      <Button primary onClick={onShowAddForm} style={{ marginLeft: "10px" }}>
        {showAddForm ? "Cancel" : "Add New Plant"}
      </Button>
    </Segment>
  );
};

export default PlantSearch;
