import { useState, useEffect } from "react";
import RiddlesLayout from "../../components/RiddlesLayout/RiddlesLayout";
import "./activeHuntPage.css";
import { useParams, useNavigate } from "react-router";
import { getHuntInstanceById } from "../../services/serviceRoutes/huntInstanceServices";
import {Dialog, Button} from '@radix-ui/themes';

const ActiveHunt = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showNewContent, setShowNewContent] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { huntTemplateId, huntInstanceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await getHuntInstanceById(huntInstanceId, huntTemplateId);
        if (response.status === 200) {
          const startTime = new Date(response.data.hunt_instance.start_time);
          const now = new Date();
          const initialTimeLeft = Math.floor((startTime - now) / 1000);
          setTimeLeft(initialTimeLeft > 0 ? initialTimeLeft : 0);
        }
      } catch (error) {
        console.error('Error fetching start time:', error);
      }
    };

    fetchStartTime();
  }, [huntTemplateId, huntInstanceId]);

  useEffect(() => {
    if (timeLeft == null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowNewContent(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRedirect = () => {
    navigate('/browse');
  };

  const handleRiddleTimerZero = () => {
    setShowDialog(true);
  };

  return (
    <div className="pregame-container">
      {!showNewContent ? (
        <>
          <div className="header">
          </div>
          <div className="content">
            {timeLeft !== null ? (
              <p className="timer">{formatTime(timeLeft)} until the hunt begins</p>
            ) : (
              <p>Loading start time...</p>
            )}
          </div>
        </>
      ) : (
        <RiddlesLayout onTimerZero={handleRiddleTimerZero} />
      )}

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content className="dialog-content">
          <Dialog.Title>The hunt is over</Dialog.Title>
          <Button className="dialog-close" variant='surface' onClick={handleRedirect}>Browse Hunts</Button>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ActiveHunt;
