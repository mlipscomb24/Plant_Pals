import React from "react";
import { List, Image, Popup } from "semantic-ui-react";

const Badges = ({ badges }) => {
  return (
    <List horizontal>
      {badges.map((badge) => (
        <List.Item key={badge.id}>
          <Popup
            trigger={
              <Image src={`/badges/${badge.id}.png`} size="mini" circular />
            }
            content={`${badge.name}: ${badge.description}`}
            position="bottom center"
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Badges;
