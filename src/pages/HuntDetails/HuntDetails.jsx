import { useState, useEffect } from 'react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { getHuntInstanceById } from '../../services/serviceRoutes/huntInstanceServices';

const HuntDetails = () => {
  const [huntInstance, setHuntInstance] = useState({});
  const [loading, setLoading] = useState(true);
  const { huntInstanceId } = useParams();
  const { huntTemplateId } = useParams();

  useEffect(() => {
    const fetchHuntInstance = async () => {
      try {
        console.log('trying');
        const response = await getHuntInstanceById(huntTemplateId, huntInstanceId);
        if (response) {
          console.log(response.data);
          setHuntInstance(response.data.hunt_instance);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchHuntInstance();
  }, [huntTemplateId, huntInstanceId]);

  const navigate = useNavigate(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  
  const startTime = huntInstance.start_time ? new Date(huntInstance.start_time).toLocaleString("en-US") : 'start time';

  return (
    <>
      <Flex
        className="hunt-details-container"
        direction="column"
        gap="20px"
        align="center"
        style={{ marginTop: '40px' }}
      >
        <Text as="h1" size="6" weight="bold" color="indigo" variant="soft" highContrast>
          {huntInstance.scavenger_hunt?.name}
        </Text>
        <Button 
          color="indigo" 
          variant="soft" 
          size="large" 
          onClick={() => navigate(`/active-hunt/${huntInstanceId}`)}
        >
          Join the Hunt!
        </Button>
        <Flex direction="column" gap="10px" width="100%" align="center">
          <Text as="label" size="4xl" weight="medium">Start Time</Text>
          <Text>{startTime}</Text> {/* Changed to use formatted startTime */}
          <Text as="label" size="4xl" weight="medium">Location</Text>
          <Text>{huntInstance.scavenger_hunt?.location || 'location'}</Text>
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
          <Text style={{ color: '#4f46e5' }}>{huntInstance.scavenger_hunt?.description || 'description'}</Text>
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
              {/* {playerList.map((entry, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.rank}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.player}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.solved}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{entry.time}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </Box>
      </Flex>
    </>
  );
};

export default HuntDetails;
