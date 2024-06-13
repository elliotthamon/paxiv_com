import { useRouter } from "next/router";
import LoadingIC from "@/components/icons/LoadingIC";

const SmallSpinner = () => {
  const router = useRouter();

  return (
    <div
      className={`${
        router.pathname.includes("assetView") &&
        "fixed top-0 left-0 bg-white opacity-60 z-50"
      } w-full ${
        router.pathname.includes("journey") ? "h-full" : "h-screen"
      } flex justify-center items-center text-center`}
    >
      <div role="status">
        <LoadingIC />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SmallSpinner;
