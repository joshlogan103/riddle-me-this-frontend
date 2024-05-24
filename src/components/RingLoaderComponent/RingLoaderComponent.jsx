import { RingLoader } from 'react-spinners';

const RingLoaderComponent = () => {
  return (
    <div className="loader-container">
      <RingLoader
        color="rgba(50, 103, 188, 1)"
        loading
        size={56}
      />
    </div>
  );
};

export default RingLoaderComponent;
