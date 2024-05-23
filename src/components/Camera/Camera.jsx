import { useRef, useState } from 'react';
import { Camera as CameraIcon } from 'phosphor-react';
import Webcam from 'react-webcam';
import './Camera.css';
import { createRiddleItemSubmission } from '../../services/serviceRoutes/riddleItemSubmissionsServices';

const Camera = (props) => {
  const { riddles } = props;
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [videoConstraints, setVideoConstraints] = useState({
    width: 1280,
    height: 720,
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
    console.log("Riddles object:", riddles); 

    try {
      const response = await createRiddleItemSubmission(riddles.scavenger_hunt.id, riddles.id, '1', { image: imageSrc });

      if (!response.ok) {
        setCameraOpen(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(data.correct ? "Object Present: True" : "Object Present: False");
      setCameraOpen(false);
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
