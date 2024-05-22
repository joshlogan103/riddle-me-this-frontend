import React from 'react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';

const HuntDetails = () => {
  const huntInstanceName = "Midnight Hunt at the Park";
  const startTime = "June 24, 2024, 8:00 PM";
  const location = "Central Park, NY";
  const description = "Join us for an exciting midnight hunt at Central Park. Solve riddles, find clues, and enjoy a thrilling adventure with friends!";
  const leaderboardData = [
    { rank: 1, player: "User1", solved: 10, time: "2:00 a.m." },
    { rank: 2, player: "User2", solved: 8, time: "2:30 a.m." },
    { rank: 3, player: "User3", solved: 7, time: "2:34 a.m." },
  ];

  return (
    <Flex
      className="hunt-details-container"
      direction="column"
      gap="20px"
      align="center"
      style={{ marginTop: '40px' }}
    >
      <Text as="h1" size="6" weight="bold" color="indigo" variant="soft" highContrast>
        {huntInstanceName}
      </Text>
      <Button color="indigo" variant="soft" size="large">Join the Hunt!</Button>
      <Flex direction="column" gap="10px" width="100%" align="center">
        <Text as="label" size="4xl" weight="medium">Start Time</Text>
        <Text>{startTime}</Text>
        <Text as="label" size="4xl" weight="medium">Location</Text>
        <Text>{location}</Text>
      </Flex>
      <Box
        style={{
          width: '80%',
          padding: '20px',
          border: '1px solid #4f46e5', 
          borderRadius: '8px',
          backgroundColor: '#e0e7ff', 
          textAlign: 'center',
          boxShadow: '0 4px 8px #4f46e5', 
          transition: 'transform 0.2s',
          color: '#4f46e5' 
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Text style={{ color: '#4f46e5' }}>{description}</Text> 
      </Box>
      <Box
        style={{
          width: '80%',
          marginTop: '20px'
        }}
      >
        <Text size="4" weight="medium" style={{ marginBottom: '10px' }}>Leaderboard</Text>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Rank</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Player</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Solved</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.rank}</td>
                <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.player}</td>
                <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.solved}</td>
                <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Flex>
  );
};


export default HuntDetails;