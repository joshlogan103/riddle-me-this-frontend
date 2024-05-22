import React, { useState } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';

const BrowseHunts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Dummy data for illustration
    const dummyResults = [
      'Hunt 1: Find the hidden treasure in the park.',
      'Hunt 2: Solve the mystery at the old library.',
      'Hunt 3: Discover secrets in the downtown area.',
    ];

    setResults(dummyResults.filter(hunt => hunt.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  return (
    <Flex
      className="browse-hunts-container"
      direction="column"
      gap="20px"
      align="center"
      style={{ marginTop: '40px' }} 
    >
      <Text as="h1" size="6" weight="bold" color="indigo" variant="soft" highContrast>Browse Hunts</Text>
      <Flex direction="row" gap="10px" width="100%" justify="center">
        <input
          type="text"
          placeholder="Search for hunts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            flex: '1',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <Button onClick={handleSearch} color="indigo" variant="soft" size="medium">
          Search
        </Button>
      </Flex>
      <Flex direction="column" gap="10px" width="100%" style={{ marginTop: '20px' }}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Text key={index} className="result-item" size="4" style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              {result}
            </Text>
          ))
        ) : (
          <Text size="4" color="gray">No results found</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default BrowseHunts;