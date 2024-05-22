import { useState, useEffect } from "react";
import RiddlesLayout from "../../components/RiddlesLayout/RiddlesLayout";
import "./activeHuntPage.css";

const PreGameView = () => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds
  const [showNewContent, setShowNewContent] = useState(false);

  useEffect(() => {
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
  }, []);

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
            <p className="timer">{formatTime(timeLeft)} until the hunt begins</p>
            </div>
        </>
      ) : (
        <RiddlesLayout />
      )}
    </div>
  );
};

export default PreGameView;
