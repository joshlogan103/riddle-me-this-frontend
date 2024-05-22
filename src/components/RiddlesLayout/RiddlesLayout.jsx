import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Camera from '../Camera/Camera';
import { getToken } from '../../services/apiToken';
import './RiddlesLayout.css';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [riddles, setRiddles] = useState([]); // State to store fetched riddles

  useEffect(() => {
    const token = getToken(); 

    fetch('https://riddle-me-this-e41841fe3e54.herokuapp.com/api/hunt-templates/1/riddle-items/', {
      headers: {
        'Authorization': token  
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error('Unauthorized access - please check your credentials');
      } else {
        throw new Error('Error fetching data');
      }
    })

  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('Unauthorized access - please check your credentials');
    } else {
      throw new Error('Error fetching data');
    }
  })
  .then(data => {
    if (Array.isArray(data)) {
      setRiddles(data.map(item => item.riddle));
    } else {
      throw new Error('Data is not in expected format');
    }
  })
  .catch(error => console.error('Error fetching riddles:', error));


    // Timer logic
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
      <div className="timer">
        Timer: {formatTime(timeLeft)}
      </div>
      <Tabs defaultValue="riddle-0">
        <TabsList className="tabs-list">
          {riddles.slice(0, 5).map((riddle, index) => (
            <TabsTrigger key={`riddle-trigger-${index}`} value={`riddle-${index}`}>
              Riddle {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="tabs-list">
          {riddles.slice(5).map((riddle, index) => (
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
    </div>
  );
};

export default RiddlesLayout;
