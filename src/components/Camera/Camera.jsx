// src/components/Camera/Camera.jsx
import { useEffect, useRef, useState } from 'react';
import { Camera as CameraIcon } from 'phosphor-react';
import Webcam from 'react-webcam';
import './Camera.css';
import { createRiddleItemSubmission } from '../../services/serviceRoutes/riddleItemSubmissionsServices';
import { countCorrectSubmissionsByParticipation } from '../../services/serviceRoutes/participationServices';
import { useParams } from 'react-router';
import RingLoaderComponent from '../RingLoaderComponent/RingLoaderComponent';

const Camera = (props) => {
  const { riddle, onCorrectIdentification } = props;
  const { participationId } = useParams();

  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [correctSubmissionsCount, setCorrectSubmissionsCount] = useState(0);
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment"  // Attempt to use the rear camera on devices
  });
  const [loading, setLoading] = useState(false);

  const openCamera = () => {
    setCameraOpen(true);
    setImageSrc(null);
    setResponseMessage(null);
  };

  const captureImage = () => {
    const capturedSrc = webcamRef.current.getScreenshot();
    setImageSrc(capturedSrc);
    setCameraOpen(false); 
  };

  const submitImage = async () => {
    setLoading(true);
    try {
      const response = await createRiddleItemSubmission(riddle.scavenger_hunt.id, riddle.id, participationId, { image: imageSrc, label: riddle.item.name });

      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      setTimeout(() => {
        setLoading(false);
        setResponseMessage(data.correct ? "Correct" : "Try Again");
        setCameraOpen(false); // Close the camera after submission
        setImageSrc(null); // Clear the captured image
        if (data.correct) {
          onCorrectIdentification(riddle.id);
          fetchCorrectSubmissionsCount();
        }
      }, 3000);
    } catch (error) {
      console.error('Error sending image to predictions:', error);
      setLoading(false);
      setResponseMessage('Error sending image to predictions');
    }
  };

  const fetchCorrectSubmissionsCount = async () => {
    try {
      if (participationId) {
        const response = await countCorrectSubmissionsByParticipation(participationId);
        if (response.status === 200) {
          setCorrectSubmissionsCount(response.data.correct_count);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchCorrectSubmissionsCount();

  return (
    <div className="camera-container">
      {loading && <RingLoaderComponent loading={loading} />}
      {!cameraOpen && !imageSrc && (
        <button className="icon-button" onClick={openCamera}>
          <CameraIcon size={32} />
        </button>
      )}
      {cameraOpen && (
        <div className="camera-content">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam"
          />
          <button className="submit-button" onClick={captureImage} style={{marginBottom: '20px'}}>
            Capture
          </button>
        </div>
      )}
      {imageSrc && !loading && (
        <div className="image-preview">
          <img src={imageSrc} alt="Captured" className="captured-image" />
          <button className="submit-button" onClick={submitImage}>
            Submit
          </button>
          <button className="icon-button" onClick={openCamera}>
            Retake Photo
          </button>
        </div>
      )}
      {responseMessage && (
        <div className="response-message">
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Camera;
