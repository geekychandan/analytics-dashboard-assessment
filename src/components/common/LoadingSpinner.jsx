import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <BeatLoader size={20} color="#ff6347" />
      </div>
    );
  };

  export default LoadingSpinner;