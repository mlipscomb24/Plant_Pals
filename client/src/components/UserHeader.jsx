import React from "react";
import { Segment, Grid, Image, Header } from "semantic-ui-react";

const UserHeader = ({ user }) => (
  <Segment>
    <Grid columns={2}>
      <Grid.Column width={4}>
        <Image src={user.avatar} size="small" circular />
      </Grid.Column>
      <Grid.Column width={12}>
        <Header as="h2">{user.name}'s Plant Collection</Header>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default UserHeader;
