import { useState, useEffect } from 'react';
import { Button, Flex, Text, Box, Table } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import { getHuntInstanceById } from '../../services/serviceRoutes/huntInstanceServices';
import { createParticipation, getPartByProfileAndHuntInstance, getPartByHuntInst, countCorrectSubmissionsByParticipation } from '../../services/serviceRoutes/participationServices';
import Loading from '../../components/Loading/Loading';
import { getProfile } from '../../services/serviceRoutes/userServices';

const HuntDetails = () => {
  const [huntInstance, setHuntInstance] = useState({});
  const [profile, setProfile] = useState({});
  const [players, setPlayers] = useState([]);
  const [participation, setParticipation] = useState(null);
  const [correctSubmissionsCount, setCorrectSubmissionsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { huntInstanceId, huntTemplateId } = useParams();
  const navigate = useNavigate();

  const handleGoToHunt = () => {
    navigate(`/active-hunt/${huntTemplateId}/${huntInstanceId}/${participation.id}`);
  };

  const handleJoinHunt = async () => {
    if (!profile.id) {
      console.error('Profile not loaded yet.');
      return;
    }
    try {
      const participationExists = await getPartByProfileAndHuntInstance(profile.id, huntInstanceId);
      if (participationExists.status === 200 && participationExists.data.length !== 0) {
        console.log('A participation already exists for this user on this hunt.');
        setParticipation(participationExists.data[0]);
        navigate(`/active-hunt/${huntTemplateId}/${huntInstanceId}/${participationExists.data[0].id}`);
      } else {
        const participationCreated = await createParticipation(profile.id, huntInstanceId, {
          place_finished: 1,
          items_found: 0,
          time_of_last_item_found: new Date().toISOString()
        });
        if (participationCreated.status === 200) {
          const participationId = participationCreated.data.id;
          console.log(`Participation created with ID: ${participationId}`);
          setParticipation(participationCreated.data);
          navigate(`/active-hunt/${huntTemplateId}/${huntInstanceId}/${participationId}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileResponse = await getProfile();
      if (profileResponse.status === 200) {
        setProfile(profileResponse.data.profile[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllPlayers = async () => {
    try {
      const allPlayers = await getPartByHuntInst(huntInstanceId);
      if (allPlayers.status === 200) {
        setPlayers(allPlayers.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchHuntInstance = async () => {
    try {
      const huntResponse = await getHuntInstanceById(huntTemplateId, huntInstanceId);
      if (huntResponse.status === 200) {
        setHuntInstance(huntResponse.data.hunt_instance);
        console.log(huntResponse.data.hunt_instance.start_time)
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchParticipation = async () => {
    try {
      const participationExists = await getPartByProfileAndHuntInstance(profile.id, huntInstanceId);
      if (participationExists.status === 200 && participationExists.data.length !== 0) {
        setParticipation(participationExists.data[0]);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCorrectSubmissionsCount = async () => {
    try {
      if (participation && participation.id) {
        const response = await countCorrectSubmissionsByParticipation(participation.id);
        if (response.status === 200) {
          setCorrectSubmissionsCount(response.data.correct_count);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profile.id) {
      fetchParticipation();
      fetchAllPlayers();
      fetchHuntInstance();
    }
  }, [profile, huntTemplateId, huntInstanceId]);

  useEffect(() => {
    fetchCorrectSubmissionsCount();
  }, [participation]);

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
      {participation && participation.id ?
        <Button
          variant="surface"
          size="large"
          onClick={handleGoToHunt}
        >
          Start Hunting!
        </Button>
        :
        <Button
          variant="surface"
          size="large"
          onClick={handleJoinHunt}
        >
          Join the Hunt!
        </Button>
      }

      <Flex direction="column" gap="10px" width="100%" align="center">
        <Text as="label" size="4xl" weight="medium">Start Time</Text>
        <Text>{startTime}</Text>
        <Text as="label" size="4xl" weight="medium">Location</Text>
        <Text>{huntInstance.scavenger_hunt?.location || 'location'}</Text>
        <Text as="label" size="4xl" weight="medium">Correct Submissions</Text>
        <Text>{correctSubmissionsCount}</Text>
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
        <Flex align={'center'}>
          <Text size="4" weight="medium" style={{ marginBottom: '10px', textAlign: 'center', width: '80vw' }}>Leaderboard</Text>
        </Flex>
        
        <Box width="100%" mt="20px">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="table-header-hunts">Player</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="table-header-date">Items Found</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {players.sort((a,b) => b.items_found - a.items_found).map((player, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell style={{ textAlign: 'center' }}>
                      <Text>
                        {player.profile.user.username}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell style={{ textAlign: 'center' }}>{player.items_found}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

export default HuntDetails;
