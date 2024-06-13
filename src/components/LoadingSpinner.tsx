import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="relative z-50 w-full min-h-screen bg-white bg-opacity-60">
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full">
        <Image
          src="/images/spinner.png"
          width={64}
          height={97}
          className="w-[30px]"
          alt="loading spinner"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
