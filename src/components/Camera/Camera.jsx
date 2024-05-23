import { useRef, useState } from 'react';
import { Camera as CameraIcon } from 'phosphor-react';
import Webcam from 'react-webcam';
import './Camera.css';
import { createRiddleItemSubmission } from '../../services/serviceRoutes/riddleItemSubmissionsServices';
import { useParams } from 'react-router';

const Camera = (props) => {
  const { riddle } = props;
  const { participationId } = useParams();

  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment"  // Attempt to use the rear camera on devices
  });

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
    console.log("Riddles object:", riddle); 

    try {
      console.log(riddle)

      // export const createRiddleItemSubmission = async (huntTemplateId, riddleItemId, participationId, payload)
      console.log(riddle.scavenger_hunt.id, riddle.id, riddle.item.name)
      const response = await createRiddleItemSubmission(riddle.scavenger_hunt.id, riddle.id, participationId, { image: imageSrc, label: riddle.item.name });

      if (!response.status == 200) {
        setCameraOpen(false);
        setImageSrc(null);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data
      setResponseMessage(data.correct ? "Object Present: True" : "Object Present: False");
      setCameraOpen(false);
      setImageSrc(null);
    } catch (error) {
      console.error('Error sending image to predictions:', error);
      setResponseMessage('Error sending image to predictions');
    }
  };

  return (
    <div className="camera-container">
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
          <button className="submit-button" onClick={captureImage}>
            Capture
          </button>
        </div>
      )}
      {imageSrc && (
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