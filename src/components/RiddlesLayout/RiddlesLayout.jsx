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

  const { huntTemplateId } = useParams();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await getRiddleItemsByTemplate(huntTemplateId);
        if (response.status === 200) {
          setRiddles(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResponse();
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [huntTemplateId]);

  if (loading) {
    return <Loading />;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p className="time-left">Time Left: {`${minutes}m ${seconds}s`}</p>
      {riddles.length > 0 ? (
        <Tabs.Root defaultValue="tab1" className="riddles-container">
          <Tabs.List className="riddles-list">
            {riddles.slice(0, 9).map((riddle, index) => (
              <Tabs.Trigger key={index} value={`tab${index + 1}`} className='riddles-tab'>
                Riddle {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {riddles.slice(0, 5).map((riddle, index) => (
            <Tabs.Content key={index} value={`tab${index + 1}`} className="riddles-content">
              <p>{riddle.riddle}</p>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      ) : (
        <p>No riddles available</p>
      )}
      <Camera />
    </div>
  );
};

export default RiddlesLayout;
