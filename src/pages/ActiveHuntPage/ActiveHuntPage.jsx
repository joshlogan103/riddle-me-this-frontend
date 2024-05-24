import { useState, useEffect } from "react";
import RiddlesLayout from "../../components/RiddlesLayout/RiddlesLayout";
import "./activeHuntPage.css";
import { useParams, useNavigate } from "react-router";
import { getHuntInstanceById } from "../../services/serviceRoutes/huntInstanceServices";
import { Dialog, Button } from "@radix-ui/themes";

const ActiveHunt = () => {
  const [timeLeft, setTimeLeft] = useState(0); // 5 seconds
  const [showNewContent, setShowNewContent] = useState(false);
  const { huntTemplateId, huntInstanceId } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [activeMode, setActiveMode] = useState(false)
  const navigate = useNavigate();

  const calculateTimeToStart = (startTime) => {
    const targetDate = new Date(startTime);
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    console.log(targetDate, currentDate);
    // const timeDifference = targetDate.getTime() - currentDate.getTime();
    const milliseconds = timeDifference;
    console.log(Math.abs(milliseconds));

    setTimeLeft(Math.abs(milliseconds));
  };

  const calculateTimeLeft = () => {
    const startTime = new Date(response.data.hunt_instance.start_time);
    const now = new Date();
    const initialTimeLeft = Math.floor((startTime - now) / 1000);
    setTimeLeft(initialTimeLeft > 0 ? initialTimeLeft : 0);
  }

  const determinePreOrActive = (startTime) => {
    const targetDate = new Date(startTime);
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    return timeDifference < 0 ? true : false
  }

  useEffect(() => {
    const fetchHuntInstance = async () => {
      try {
        const response = await getHuntInstanceById(
          huntTemplateId,
          huntInstanceId
        );
        // console.log(response.data)
        if (response.status === 200) {
          const startTime = response.data.hunt_instance.start_time
          const active = determinePreOrActive(startTime);
          console.log(active)
          active 
            ? calculateTimeLeft(startTime) && setActiveMode(true)
            : calculateTimeToStart(startTime)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHuntInstance();
  }, [activeMode]);

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

    return () => clearInterval(timer) && setActiveMode(true);
  }, [timeLeft]);

  const formatTime = (timeLeft) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = timeLeft % 60;
    return `${days} days ${hours} hours ${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRedirect = () => {
    navigate("/browse");
  };

  const handleRiddleTimerZero = () => {
    setShowDialog(true);
  };

  return (
    <div className="pregame-container">
      {!showNewContent ? (
        <>
          <div className="header"></div>
          <div className="content">
            {!activeMode ? (
              <p className="timer">
                {formatTime(timeLeft)} until the hunt begins
              </p>
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
          <Button
            className="dialog-close"
            variant="surface"
            onClick={handleRedirect}
          >
            Browse Hunts
          </Button>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ActiveHunt;
