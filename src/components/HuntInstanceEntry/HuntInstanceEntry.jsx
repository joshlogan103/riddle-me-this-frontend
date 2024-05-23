import React, { useEffect, useState } from "react";
import { Table, Button } from "@radix-ui/themes";
import { NavLink, useParams } from "react-router-dom";
import { getHuntInstancesByTemplate } from "../../services/serviceRoutes/huntInstanceServices";

const HuntInstanceEntry = ({ results }) => {

  useEffect(() => {
    !results && fetchInstanceData();
    async function fetchInstanceData() {
        const huntTemplateId = useParams()
      try {
        const response = await getHuntInstancesByTemplate(huntTemplateId)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <>
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
