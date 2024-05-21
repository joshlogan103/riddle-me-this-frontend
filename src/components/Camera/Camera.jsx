import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import './Camera.css';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = imageSrc;
    image.onload = async () => {
      const ctx = canvas.getContext('2d');
      canvas.width = croppedArea.width;
      canvas.height = croppedArea.height;
      ctx.drawImage(
        image,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );
      const croppedImageSrc = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedImageSrc);

      // Save the cropped image
      const link = document.createElement('a');
      link.href = croppedImageSrc;
      link.download = 'cropped-image.jpg';
      link.click();
    };
  };

  return (
    <div className="camera-container">
      {!imageSrc ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <button className="capture-button" onClick={capture}>
            Capture photo
          </button>
        </div>
      ) : (
        <div>
          <div className="crop-container">
            <img src={imageSrc} alt="captured" style={{ display: 'none' }} />
            <Cropper
              image={imageSrc}
              crop={{ x: 0, y: 0 }}
              zoom={1}
              aspect={4 / 3}
              onCropChange={() => {}}
              onCropComplete={onCropComplete}
              onZoomChange={() => {}}
            />
          </div>
          <button className="crop-button" onClick={cropImage}>
            Crop and Save
          </button>
          {croppedImage && <img src={croppedImage} alt="cropped" className="cropped-image" />}
        </div>
      )}
    </div>
  );
};

export default Camera;
