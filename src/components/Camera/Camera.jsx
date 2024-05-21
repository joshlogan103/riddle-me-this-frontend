import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import './Camera.css';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = imageSrc;
    image.onload = async () => {
      const ctx = canvas.getContext('2d');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImageSrc = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedImageSrc);

      // Save the cropped image
      const link = document.createElement('a');
      link.href = croppedImageSrc;
      link.download = 'cropped-image.jpg';
      link.click();

      // Remove original image
      setImageSrc(null);
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
            <Cropper
              image={imageSrc}
              crop={crop}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>
          <button className="crop-button" onClick={cropImage}>
            Crop and Save
          </button>
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="cropped" className="cropped-image" />}
    </div>
  );
};

export default Camera;
