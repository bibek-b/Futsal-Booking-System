import { useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useLockBodyScroll } from "../../CustomHooks/useLockBodyScroll";
import { LoaderContext } from "../../Context/LoaderContext";

const GlobalLoader = () => {
  const { isLoading } = useContext(LoaderContext);

 useLockBodyScroll(isLoading)
  return (
    isLoading && (
      <div className=" fixed text-gre inset-0 flex items-center justify-center bg-black/50 bg-blue">
        <InfinitySpin
          color="white"
        />
      </div>
    )
  );
};

export default GlobalLoader;