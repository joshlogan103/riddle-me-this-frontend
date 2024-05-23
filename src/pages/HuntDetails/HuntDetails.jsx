import { useState, useEffect } from 'react';
import { Button, Flex, Text, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { getHuntInstanceById } from '../../services/serviceRoutes/huntInstanceServices';
import { createParticipation, getPartByProfileAndHuntInstance } from '../../services/serviceRoutes/participationServices';
import Loading from '../../components/Loading/Loading';
import { getProfile } from '../../services/serviceRoutes/userServices';

const HuntDetails = () => {
  const [huntInstance, setHuntInstance] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { huntInstanceId, huntTemplateId } = useParams();
  const navigate = useNavigate(); 

  const handleJoinHunt = async () => {
    if (!profile.id) {
      console.error('Profile not loaded yet.');
      return;
    }
    try {
      const participationExists = await getPartByProfileAndHuntInstance(profile.id, huntInstanceId);
      if (participationExists.status === 200 && participationExists.data.length == 0) {
        await handleCreateParticipation();
      } else if (participationExists.status === 200 && participationExists.data.length !== 0) {
        console.log('A participation already exists for this user on this hunt.');
        navigate(`/active-hunt/${huntTemplateId}/${huntInstanceId}/${participationExists.data[0].id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateParticipation = async () => {
    try {
      const participationCreated = await createParticipation(profile.id, huntInstanceId, {
        place_finished: 1,
        items_found: 0,
        time_of_last_item_found: new Date().toISOString()
      });
      if (participationCreated.status === 200) {
        console.log(participationCreated.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileResponse = await getProfile();
      if (profileResponse.status === 200) {
        console.log(profileResponse.data.profile[0]);
        setProfile(profileResponse.data.profile[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHuntInstance = async () => {
    try {
      const huntResponse = await getHuntInstanceById(huntTemplateId, huntInstanceId);
      if (huntResponse.status === 200) {
        console.log(huntResponse.data);
        setHuntInstance(huntResponse.data.hunt_instance);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
      await fetchHuntInstance();
    };
    fetchData();
  }, [huntTemplateId, huntInstanceId]);

  if (loading) {
    return <Loading />; 
  }

  const startTime = huntInstance.start_time ? new Date(huntInstance.start_time).toLocaleString("en-US") : 'start time';

  return (
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
        onClick={handleJoinHunt}
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
            {/* Placeholder for leaderboard entries */}
          </tbody>
        </table>
      </Box>
    </Flex>
  );
};

export default HuntDetails;
