import { useState } from "react";
import AuthProvider from "@/contexts/AuthContext";
import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [homeVideoRef] = useState<any>(React.createRef());
  const [globeVideoRef] = useState<any>(React.createRef());

  const [isHomeVideoLoaded, setIsHomeVideoLoaded] = useState<boolean>(false);
  const [isGlobeVideoLoaded, setIsGlobeVideoLoaded] = useState<boolean>(false);

  const useVideos = true;

  const isHome = router.pathname == "/";

  return (
    <main className="relative w-full min-h-screen m-auto overflow-hidden">
      <div className="absolute top-0 left-0 w-full">
        {useVideos && (
          <video
            ref={homeVideoRef}
            onCanPlay={() => {
              setIsHomeVideoLoaded(true);
            }}
            onPlay={() => {
              setIsHomeVideoLoaded(true);
            }}
            width={2048}
            height={1080}
            src="/images/home-video.mp4"
            className={`w-full h-screen object-cover ${!isHome && "hidden"}`}
            autoPlay={true}
            muted
            loop
            preload="metadata"
            playsInline
          />
        )}

        {!isHomeVideoLoaded && isHome && (
          <Image
            src="/images/home.png"
            width={2048}
            height={1280}
            className={`object-cover w-full h-screen`}
            alt="home background"
          />
        )}
      </div>

      <div className="absolute top-0 left-0 w-full">
        {useVideos && (
          <video
            ref={globeVideoRef}
            onCanPlay={() => {
              setIsGlobeVideoLoaded(true);
            }}
            onPlay={() => {
              setIsGlobeVideoLoaded(true);
            }}
            width={2048}
            height={1080}
            src="/images/about.mp4"
            className={`w-full h-screen object-cover ${isHome && "hidden"}`}
            autoPlay={true}
            muted
            loop
            preload="metadata"
            playsInline
          />
        )}
        {!isGlobeVideoLoaded && !isHome && (
          <Image
            src="/images/about.png"
            width={2048}
            height={1280}
            className="object-cover w-full h-screen"
            alt="about background"
          />
        )}
      </div>

      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </main>
  );
}
