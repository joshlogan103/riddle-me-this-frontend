import { useState, useEffect } from "react";
import RiddlesLayout from "../../components/RiddlesLayout/RiddlesLayout";
import "./activeHuntPage.css";
import { getHuntInstanceById } from "../../services/serviceRoutes/huntInstanceServices";
import { useParams } from "react-router";

const PreGameView = () => {
  const [timeLeft, setTimeLeft] = useState(0); // 5 seconds
  const [showNewContent, setShowNewContent] = useState(false);
  const { huntTemplateId, huntInstanceId } = useParams();

  const calculateTimeLeft = (startTime) => {
    const targetDate = new Date(startTime);
    const currentDate = new Date();
    console.log(targetDate, currentDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const milliseconds = timeDifference;
    console.log(Math.abs(milliseconds));

    setTimeLeft(Math.abs(milliseconds));
  };

  useEffect(() => {
    const fetchHuntInstance = async () => {
      try {
        const response = await getHuntInstanceById(
          huntTemplateId,
          huntInstanceId
        );
        // console.log(response.data)
        if (response.status === 200) {
          calculateTimeLeft(response.data.hunt_instance.start_time);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHuntInstance();
  }, []);

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
  }, [timeLeft]);

  const formatTime = (timeLeft) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    const remainingSeconds = timeLeft % 60;
    return `${days} days ${hours} hours ${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pregame-container">
      {!showNewContent ? (
        <>
          <div className="header"></div>
          <div className="content">
            <p className="timer">{formatTime(timeLeft)}</p>
            <p> until the hunt begins</p>
          </div>
        </>
      ) : (
        <RiddlesLayout />
      )}
    </div>
  );
};

export default PreGameView;
