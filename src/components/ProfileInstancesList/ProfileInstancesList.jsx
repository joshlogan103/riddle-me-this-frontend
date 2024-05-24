import React from "react";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

const ProfileInstancesList = ({ participations }) => {
  return (
    <Table.Root m="4">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!participations.length ? (
          <Table.Row><Table.Cell colSpan="3">No records to Show</Table.Cell></Table.Row>
        ) : (
          participations.map((game, idx) => {
            const dateObj = new Date(game.hunt_instance.end_time);
            const endTime = dateObj.toLocaleString("en-US");

            return (
              <Table.Row key={idx}>
                <Table.Cell>
                  <Button variant="surface" style={{ padding: "20px" }}>
                    <NavLink
                      to={`/hunt-details/${game.hunt_instance.id}/${game.hunt_instance.scavenger_hunt.id}`} style={{textDecoration: 'none', color:'lightgray'}}
                    >
                      {game.hunt_instance.scavenger_hunt.name}
                    </NavLink>
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {game.hunt_instance.scavenger_hunt.location}
                </Table.Cell>
                <Table.Cell>{endTime}</Table.Cell>
              </Table.Row>
            );
          })
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default ProfileInstancesList;
