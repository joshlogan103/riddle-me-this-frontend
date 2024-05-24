import React, { useEffect, useState } from "react";
import { Table, Button, Text, Flex } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import { getHuntInstancesByTemplate } from "../../services/serviceRoutes/huntInstanceServices";

const HuntInstanceEntry = ({ results, setResults, byHuntId, huntId }) => {
  useEffect(() => {
    byHuntId && fetchInstanceData();
    async function fetchInstanceData() {
      try {
        const response = await getHuntInstancesByTemplate(huntId)
        console.log(response)
        setResults(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <>
      <Table.Row>
        <Table.ColumnHeaderCell colSpan={2}>
          <Flex justify="end">
            <Button variant="surface">New Instance</Button>
          </Flex>
          <Flex justify="center">Hunt Instances</Flex>
        </Table.ColumnHeaderCell>
      </Table.Row>
      {results.length > 0 ? (
        results.map((result, index) => {
          const dateObj = new Date(result.start_time);
          const startTime = dateObj.toLocaleString("en-US");
          return (
            <Table.Row key={index}>
              <Table.RowHeaderCell>
                <NavLink
                  to={`/hunt-details/${result.id}/${result.scavenger_hunt.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    variant="surface"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {result.scavenger_hunt.name}
                  </Button>
                </NavLink>
              </Table.RowHeaderCell>
              <Table.Cell>{startTime}</Table.Cell>
            </Table.Row>
          );
        })
      ) : (
        <Table.Row>
          <Table.Cell colSpan="2" style={{ textAlign: "center" }}>
            <Text size="4" color="gray">
              No results found
            </Text>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};

export default HuntInstanceEntry;
