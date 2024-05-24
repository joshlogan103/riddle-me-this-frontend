// src/components/RiddlesLayout/RiddlesLayout.jsx
import { useState, useEffect } from 'react';
import { getRiddleItemsByTemplate } from '../../services/serviceRoutes/riddleItemServices';
import { useParams } from 'react-router';
import * as Tabs from '@radix-ui/react-tabs';
import Loading from '../Loading/Loading';
import Camera from '../Camera/Camera';
import { Text, Flex, Card } from '@radix-ui/themes';
import './RiddlesLayout.css';

const RiddlesLayout = ({ onTimerZero }) => {
  const [timeLeft, setTimeLeft] = useState(3000);
  const [riddles, setRiddles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [riddleSelected, setRiddleSelected] = useState({});
  const [correctRiddles, setCorrectRiddles] = useState(new Set());
  const { huntTemplateId } = useParams();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await getRiddleItemsByTemplate(huntTemplateId);
        if (response.status === 200) {
          setRiddles(response.data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch riddles');
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResponse();
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (onTimerZero) {
            onTimerZero();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [huntTemplateId, onTimerZero]);

  useEffect(() => {
    const index = parseInt(activeTab.replace('tab', '')) - 1;
    setRiddleSelected(riddles[index]);
  }, [riddles, activeTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleCorrectIdentification = (riddleId) => {
    setCorrectRiddles((prevSet) => new Set(prevSet).add(riddleId));
  };

  if (loading) {
    return <Loading />;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p className="time-left">Time Left: {`${minutes}m ${seconds}s`}</p>
      {riddles.length > 0 ? (
        <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="riddles-container">
          <Tabs.List className="riddles-list">
            {riddles.map((riddle, index) => (
              <Tabs.Trigger
                key={index}
                value={`tab${index + 1}`}
                className={`riddles-tab ${activeTab === `tab${index + 1}` ? 'active-tab' : ''} ${correctRiddles.has(riddle.id) ? 'correct-riddle' : ''}`}
                disabled={correctRiddles.has(riddle.id)}
              >
                Riddle {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {riddles.map((riddle, index) => (
            <Tabs.Content key={index} value={`tab${index + 1}`} className="riddles-content">
              <Card className="riddle-card" variant="surface" padding="20px" style={{ marginTop: '20px', borderRadius: '8px', border: '1px solid var(--color-surface)' }}>
                <Text size="4" weight="medium" style={{ textAlign: 'center' }}>{riddle.riddle}</Text>
              </Card>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      ) : (
        <p>No riddles available</p>
      )}
      <Camera riddle={riddleSelected} onCorrectIdentification={handleCorrectIdentification} />
    </div>
  );
};

export default RiddlesLayout;
