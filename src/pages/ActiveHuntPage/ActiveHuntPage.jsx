import { useState, useEffect } from "react";
import RiddlesLayout from "../../components/RiddlesLayout/RiddlesLayout";
import "./activeHuntPage.css";
import { useParams } from "react-router";
import { getHuntInstanceById } from "../../services/serviceRoutes/huntInstanceServices";

const ActiveHunt = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showNewContent, setShowNewContent] = useState(false);
  const { huntTemplateId, huntInstanceId } = useParams();
  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await getHuntInstanceById(huntInstanceId, huntTemplateId);
        if (response.status == 200) {

        const startTime = new Date(response.data.hunt_instance.start_time);
        const now = new Date();
        const initialTimeLeft = Math.floor(startTime - now); 
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
        <RiddlesLayout />
      )}
    </div>
  );
};

export default ActiveHunt;
