import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Camera from '../Camera/Camera';
import './RiddlesLayout.css';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const riddles = [
    "Riddle text 1 ...",
    "Riddle text 2 ...",
    "Riddle text 3 ...",
    "Riddle text 4 ...",
    "Riddle text 5 ...",
    "Riddle text 6 ...",
    "Riddle text 7 ...",
    "Riddle text 8 ...",
    "Riddle text 9 ...",
    "Riddle text 10 ..."
  ]; // Example riddles array, this can be dynamically loaded

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
      <Tabs defaultValue="riddle-0">
        <TabsList className="tabs-list">
          {riddles.slice(0, 5).map((_, index) => (
            <TabsTrigger key={`riddle-trigger-${index}`} value={`riddle-${index}`}>
              Riddle {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="tabs-list">
          {riddles.slice(5, 10).map((_, index) => (
            <TabsTrigger key={`riddle-trigger-${index + 5}`} value={`riddle-${index + 5}`}>
              Riddle {index + 6}
            </TabsTrigger>
          ))}
        </TabsList>

        {riddles.map((riddle, index) => (
          <TabsContent key={`riddle-content-${index}`} value={`riddle-${index}`}>
            <div className="riddle">
              <div className="riddle-text">{riddle}</div>
              <Camera />
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="timer">
        Timer: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default RiddlesLayout;
