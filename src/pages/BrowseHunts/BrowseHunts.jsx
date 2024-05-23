import React, { useEffect, useState } from "react";
import { Button, Flex, Text, Box, Table } from "@radix-ui/themes";
import { getAllHuntInstances } from "../../services/serviceRoutes/huntInstanceServices";
import "./browseHunts.css";
import HuntInstanceEntry from "../../components/HuntInstanceEntry/HuntInstanceEntry";

const BrowseHunts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await getAllHuntInstances();
        if (response.status === 200) {
          console.log(response.data);
          setResults(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchResponse();
  }, []);

  const handleSearch = () => {
    // Dummy data for illustration
    const dummyResults = [
      "Hunt 1: Find the hidden treasure in the park.",
      "Hunt 2: Solve the mystery at the old library.",
      "Hunt 3: Discover secrets in the downtown area.",
    ];

    setResults(
      dummyResults.filter((hunt) =>
        hunt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <Flex
      className="browse-hunts-container"
      direction="column"
      gap="20px"
      align="center"
      m="4"
      style={{ marginTop: "40px" }}
    >
      <Text
        as="h1"
        size="6"
        weight="bold"
        color="indigo"
        variant="soft"
        highContrast
      >
        Browse Hunts
      </Text>
      <Flex direction="row" className="search-container" width="100%" justify="center">
        <input
          type="text"
          placeholder="Search for hunts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Button
          onClick={handleSearch}
          color="indigo"
          variant="soft"
          size="medium"
        >
          Search
        </Button>
      </Flex>
      <Box width="100%" mt="20px">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="table-header-hunts">Hunts</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="table-header-date">Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <HuntInstanceEntry results={results}/>
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  );
};

export default BrowseHunts;
