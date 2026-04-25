import { useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { LoaderContext } from "../../Context/LoaderContext";

const GlobalLoader = () => {
  const { isLoading } = useContext(LoaderContext);

  return (
    isLoading && (
      <div className=" fixed  inset-0 flex items-center justify-center bg-black/50 bg-blue z-9999">
        <InfinitySpin
          color="white"
        />
      </div>
    )
  );
};

export default GlobalLoader;