import { useState, useEffect } from 'react';
import { Info } from 'phosphor-react';
import './RiddlesLayout.css';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

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
    <div className="riddles-layout">
      <div className="riddles">
        <div className="riddles-input">
          <input type="text" value="riddle text riddle ..." readOnly />
        </div>
      </div>

      <div className="riddles">
        <div className="riddles-input">
          <input type="text" value="riddle text riddle ..." readOnly />
        </div>
      </div>

      <div className="riddles">
        <div className="riddles-input">
          <input type="text" value="riddle text riddle ..." readOnly />
        </div>
      </div>

      <div className="timer">
        Timer: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default RiddlesLayout;
