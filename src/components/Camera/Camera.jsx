import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Camera.css';

const Camera = () => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const openCamera = () => {
    setCameraOpen(true);
  };

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCameraOpen(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending image to predictions:', error);
    }
  };

  return (
    <div className="camera-container">
      {!cameraOpen && !imageSrc && (
        <button className="open-camera-button" onClick={openCamera}>
          Open Camera
        </button>
      )}
      {cameraOpen && (
        <div>
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
        <div>
          <img src={imageSrc} alt="captured" className="captured-image" />
        </div>
      )}
    </div>
  );
};

export default Camera;
