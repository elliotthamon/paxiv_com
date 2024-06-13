/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

import HeaderAdmin from "@/components/admin/HeaderAdmin";
import FooterAdmin from "@/components/admin/FooterAdmin";
import ChatIC from "@/components/icons/ChatIC";
import BackIC from "@/components/icons/BackIC";
import chatKitty from "@/components/chat/chatkitty";

import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import useMember from "@/hooks/useMember";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
  MAP_LIBRARIES,
} from "@/libs/constants";
import MessagingBox from "@/components/admin/MessagingBox";
import { useJsApiLoader } from "@react-google-maps/api";

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutAdmin = ({ children }: LayoutProps) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const auth = useAuth();
  const { getChatList } = useMember();
  const [videoRef] = useState<any>(React.createRef());

  const [isChatOpened, setIsChatOpened] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const checkIfPermitted = () => {
    const pathname = router.pathname;
    if (
      pathname == "/admin/dashboard" ||
      pathname == "/aisearch" ||
      pathname == "/admin/editProfile" ||
      pathname.includes("/admin/companyResources") ||
      pathname.includes("/admin/companyAssets")
    ) {
      return true;
    }
    return false;
  };

  const getBelongedChannelArr = (
    channels: any,
    user: any,
    users: Array<any>
  ) => {
    const channel_arr: Array<any> = [];
    //@ts-ignore
    for (let channel of channels.paginator.items) {
      if (channel?.members) {
        const isFirstIncluded =
          Array.isArray(users) &&
          users.some((item) => item.email === channel.members[0].name);
        const isSecondIncluded =
          Array.isArray(users) &&
          users.some((item) => item.email === channel.members[1].name);
        if (isFirstIncluded && isSecondIncluded) {
          for (let member of channel.members) {
            if (member?.name == user.email) {
              channel_arr.push(channel);
            }
          }
        }
      }
    }
    return channel_arr;
  };

  const getInitUnread = async (user: any, users: Array<any>) => {
    const channels = await chatKitty.getChannels({
      filter: { unread: true },
    });
    let unread_arr: Array<any> = [];

    for (let channel of getBelongedChannelArr(channels, user, users)) {
      const unread_result = await chatKitty.getUnreadMessagesCount({
        channel: channel,
      });
      const firstMatch = channel.members.find(
        (item: any) => item.name !== user.email
      );
      unread_arr.push({
        email: firstMatch.name,
        //@ts-ignore
        count: unread_result.count,
      });
    }
    authContext.setUnreadArr(unread_arr);
  };

  const handleReceiveMessage = async (user: any, users: Array<any>) => {
    const channels = await chatKitty.getChannels({
      filter: { unread: true },
    });
    let unread_arr: Array<any> = [];

    for (let channel of getBelongedChannelArr(channels, user, users)) {
      const unread_result = await chatKitty.getUnreadMessagesCount({
        channel: channel,
      });
      const firstMatch = channel.members.find(
        (item: any) => item.name !== user.email
      );
      unread_arr.push({
        email: firstMatch.name,
        //@ts-ignore
        count: unread_result.count,
      });
    }
    authContext.setUnreadArr(unread_arr);
  };

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((error: any) => {
          console.error("Video playback error:", error);
        });
      }
    };

    const storedPosition = localStorage.getItem("videoPlaybackPosition");
    if (storedPosition && videoRef.current) {
      videoRef.current.currentTime = parseFloat(storedPosition);
    }

    playVideo();

    const saveInterval = setInterval(() => {
      if (videoRef.current) {
        localStorage.setItem(
          "videoPlaybackPosition",
          videoRef.current.currentTime.toString()
        );
      }
    }, 100);

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        localStorage.setItem(
          "videoPlaybackPosition",
          // eslint-disable-next-line react-hooks/exhaustive-deps
          videoRef.current.currentTime.toString()
        );
      }

      clearInterval(saveInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const init = async () => {
      const user = await auth.getUser();
      if (
        !router.pathname.includes("admin/support") &&
        !checkIfPermitted() &&
        user?.role == ROLE_AI_SEARCHER
      ) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.push("/admin/dashboard");
      }
      setUser(user);

      if (user == null) router.push("/auth/login");
      const users = authContext.users;
      if (users.length == 0) {
        const users = await getChatList();
        const chat_users = users ? users.filter((item: any) => item._id != user._id) : [];
        authContext.setUsers(chat_users);
        const chatSession = await chatKitty.startSession({
          username: user?.email,
        });
        authContext.setChatSession(chatSession);
        await getInitUnread(user, users);
        await receiveMessage(user, users);
      }
    };
    init();
  }, [authContext.isLoggedIn]);

  const receiveMessage = async (user: any, users: Array<any>) => {
    const channels = await chatKitty.getChannels();
    //@ts-ignore
    for (let channel of getBelongedChannelArr(channels, user, users)) {
      chatKitty.startChatSession({
        channel: channel,
        onReceivedMessage: (message) => handleReceiveMessage(user, users),
      });
    }
  };

  useEffect(() => {
    const update = async () => {
      const unreadArr = authContext.unreadArr;
      let totalUnreadCount: number = 0;
      for (let item of unreadArr) {
        totalUnreadCount += item.count;
      }
      authContext.setTotalUnreadCnt(totalUnreadCount);
    };
    update();
  }, [authContext.unreadArr]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    libraries: MAP_LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });
  // console.log(`Maps Init: ${isLoaded} : ${loadError}`);

  return (
    <>
      <Head>
        <title>Paxiv Admin Panel</title>
        <meta name="description" content="Paxiv" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative w-full min-h-screen px-4 overflow-x-hidden xl:px-0">
        <div className="absolute top-0 left-0 w-full h-screen">
          <Image
            src="/images/about.png"
            width={2048}
            height={1280}
            className="object-cover w-full h-screen"
            alt="about background"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            ref={videoRef}
            width={2048}
            height={1080}
            src="/images/about.mp4"
            className={`w-full h-full object-cover`}
            autoPlay={true}
            muted
            loop
            preload="metadata"
            playsInline
          />
        </div>
        <HeaderAdmin setIsChatOpened={setIsChatOpened} />
        {!router.pathname.includes("admin/dashboard") &&
          !authContext.isLoading && (
            <div className="relative max-w-[1240px] mx-auto mt-4">
              <button
                className="flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary hover:bg-gray-100 active:bg-gray-200"
                onClick={() => router.back()}
              >
                <BackIC />
              </button>
            </div>
          )}
        {router.pathname.includes("admin/companyProfileEdit") ||
        router.pathname.includes("admin/assetEdit") ? (
          <div className={`md:pl-2 w-full`}>{children}</div>
        ) : authContext.isLoading ? (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={`md:pl-2 w-full`}>{children}</div>
        )}
        {user?.role != ROLE_ONBOARDING_ADMIN &&
          user?.role != ROLE_ONBOARDING_USER &&
          user?.role != ROLE_AI_SEARCHER &&
          router.pathname != "/admin/search" &&
          !isChatOpened && (
            <div
              className="chat-pos"
              onClick={() => setIsChatOpened(!isChatOpened)}
            >
              <div
                className="relative w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center cursor-pointer"
                data-tooltip-content="Start chat"
                data-tooltip-id="chat-id"
              >
                <ChatIC />
                {authContext.totalUnreadCnt != 0 && (
                  <div className="absolute top-0 right-0 w-[20px] h-[20px] rounded-full flex justify-center items-center bg-[#cb112d] text-white">
                    {authContext.totalUnreadCnt}
                  </div>
                )}
              </div>
            </div>
          )}
        {isChatOpened && (
          <MessagingBox
            isChatOpened={isChatOpened}
            setIsChatOpened={setIsChatOpened}
            user={user}
          />
        )}
        {authContext.isLoading && (
          <div className="w-full bg-white h-loading"></div>
        )}
        {<FooterAdmin />}
        <Tooltip
          id="chat-id"
          place="top"
          className="text-center"
          style={{ maxWidth: "300px" }}
        />
      </main>
    </>
  );
};
export default LayoutAdmin;
