import { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import "./activeHuntPage.css";

const PreGameView = () => {
  // const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(60); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
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
      <div className="header">
        {/* <NavLink to="/browse">Browse</NavLink> */}
      </div>
      <div className="content">
        <p className="timer">{formatTime(timeLeft)} until Game Start</p>
        {timeLeft === 0 && (
          <Button variant="surface" className="start-button">START</Button>
        )}
      </div>
    </div>
  );
};

export default PreGameView;
