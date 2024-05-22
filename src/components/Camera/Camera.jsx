import { useRef, useState } from 'react';
import { Camera as CameraIcon } from 'phosphor-react';
import Webcam from 'react-webcam';
import './Camera.css';

const Camera = () => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const openCamera = () => {
    setCameraOpen(true);
  };

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCameraOpen(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/hunt-templates/1/riddle-items/1/participations/1/riddle-item-submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc, label: "shower_curtain" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data);  // Add this line to debug the response
      setResponseMessage(data.correct ? "Object Present: True" : "Object Present: False");
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
            className="webcam"
          />
          <button className="submit-button" onClick={captureAndSend}>
            Submit
          </button>
        </div>
      )}
      {imageSrc && (
        <div className="image-preview">
          <img src={imageSrc} alt="captured" className="captured-image" />
          <button className="submit-button" onClick={captureAndSend}>
            Submit
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
