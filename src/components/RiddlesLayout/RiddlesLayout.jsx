import { useState, useEffect } from 'react';
import { getRiddleItemsByTemplate } from '../../services/serviceRoutes/riddleItemServices';
import { useParams } from 'react-router';
import * as Tabs from '@radix-ui/react-tabs';
import Loading from '../Loading/Loading';
import Camera from '../Camera/Camera';
import './RiddlesLayout.css';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [riddles, setRiddles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");  // Initialize with the default value
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
        // Optionally update the UI to show an error message
      }
    };
    fetchResponse();
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [huntTemplateId]);

  const handleTabChange = (value) => {
    setActiveTab(value);
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
              className={`riddles-tab ${activeTab === `tab${index + 1}` ? 'active-tab' : ''}`}>
              Riddle {index + 1}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {riddles.map((riddle, index) => (
          <Tabs.Content key={index} value={`tab${index + 1}`} className="riddles-content">
            <p>{riddle.riddle}</p>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      
      ) : (
        <p>No riddles available</p>
      )}
      <Camera riddles={riddles}/>
    </div>
  );
};

export default RiddlesLayout;

// TODO: once the game is over, the user should be redirected to the hunt details page