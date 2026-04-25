import { InfinitySpin } from "react-loader-spinner";

const SuspenseLoader = () => {
  return (
    <div className=" fixed  inset-0 flex items-center justify-center bg-black/50 bg-blue z-9999">
      <InfinitySpin color="white" />
    </div>
  );
};

export default SuspenseLoader;
