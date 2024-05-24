import RingLoader from 'react-spinners/RingLoader';
import '../Loader/Loader.jsx';

const LoaderSymbol = () => {
  return (
    <div className="loading-spinner">
      <RingLoader
        color="rgba(34, 110, 199, 1)"
        loading
      />
    </div>
  );
};

export default LoaderSymbol;
