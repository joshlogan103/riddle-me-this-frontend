import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Camera.css';

const Camera = () => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const openCamera = () => {
    setCameraOpen(true);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCameraOpen(false);
  };

  const saveImage = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'captured-image.jpg';
    link.click();
    setCroppedImage(imageSrc); // Save the image for display after download
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
          <button className="capture-button" onClick={capture}>
            Capture Photo
          </button>
        </div>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="captured" className="captured-image" />
          <button className="save-button" onClick={saveImage}>
            Save Image
          </button>
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="saved" className="saved-image" />}
    </div>
  );
};

export default Camera;
