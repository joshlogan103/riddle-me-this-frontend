import { useState, useEffect } from 'react';
import { getRiddleItemsByTemplate } from '../../services/serviceRoutes/riddleItemServices';
import { getHuntInstancesByTemplate } from '../../services/serviceRoutes/huntInstanceServices';
import { useParams } from 'react-router';

const RiddlesLayout = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [riddles, setRiddles] = useState([]); // State to store fetched riddles
  const [loading, setLoading] = useState(true);

  const { huntTemplateId } = useParams(); 
  console.log(huntTemplateId);
  
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await getRiddleItemsByTemplate(huntTemplateId);
        if (response.status === 200) {
          console.log(response.data);
          setRiddles(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResponse();
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  
    return () => clearInterval(timer);
  }, [huntTemplateId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {riddles.length > 0 ? (
        <ul>
          {riddles.map((riddle, index) => (
            <li key={index}>{riddle.riddle}</li>
          ))}
        </ul>
      ) : (
        <p>No riddles available</p>
      )}
      {/* FIXME: Change timer from seconds to minutes */}
      <p>Time Left: {timeLeft} </p>
    </div>
  );
};

export default RiddlesLayout;
