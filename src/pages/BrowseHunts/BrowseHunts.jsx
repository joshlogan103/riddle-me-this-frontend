import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { getAllHuntInstances } from "../../services/serviceRoutes/huntInstanceServices";
import "./browseHunts.css";
import { NavLink } from "react-router-dom";

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
      <Flex direction="row" gap="10px" width="100%" justify="center">
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
      <Flex
        direction="column"
        gap="10px"
        width="100%"
        style={{ marginTop: "20px" }}
      >
        {results.length > 0 ? (
          results.map((result, index) => {
            const dateObj = new Date(result.start_time);
            const startTime = dateObj.toLocaleString("en-US");
            return (
              <Flex
                key={index}
                className="result-item"
                size="4"
                style={{ padding: "10px", borderBottom: "1px solid #ccc", justifyContent: "space-around" }}
              >
                <NavLink
  to={`/hunt-details/${result.id}/${result.scavenger_hunt.id}`}
  style={{ textDecoration: 'none', color: 'inherit' }} 
>
  <Button
    variant="surface" // Added surface variant
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    {result.scavenger_hunt.name}
  </Button>
</NavLink>
<div>{startTime}</div>
</Flex>
);
          })
        ) : (
          <Text size="4" color="gray">
            No results found
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default BrowseHunts;
