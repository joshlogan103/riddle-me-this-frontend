import { useState, useEffect } from 'react';
import { getRiddleItemsByTemplate } from '../../services/serviceRoutes/riddleItemServices';
import { useParams, useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import Loading from '../Loading/Loading';
import Camera from '../Camera/Camera';
import './RiddlesLayout.css';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(1000);
  const [riddles, setRiddles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [riddleSelected, setRiddleSelected] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { huntTemplateId } = useParams();
  const navigate = useNavigate();

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
          setShowDialog(true);
          setDisabled(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [huntTemplateId]);

  useEffect(() => {
    const index = parseInt(activeTab.replace('tab', '')) - 1;
    setRiddleSelected(riddles[index]);
  }, [riddles, activeTab]);

  const handleTabChange = (value) => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    navigate('http://localhost/'); // Adjust this path to the route you want to navigate to
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
                className={`riddles-tab ${activeTab === `tab${index + 1}` ? 'active-tab' : ''}`}
                disabled={disabled}>
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
      <Camera riddle={riddleSelected} />

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <p>Time is up!</p>
            <p>Here are your results</p>
            <button onClick={closeDialog} disabled={disabled}>Return to hunts</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiddlesLayout;