import { useState, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthContext";

import SmallSpinner from "@/components/SmallSpinner";
import ChatUserList from "@/components/chat/ChatUserList";
import chatKitty from "@/components/chat/chatkitty";
import ChatInterface from "@/components/chat/ChatInterface";
import SearchIC from "@/components/icons/SearchIC";
import CloseIC from "@/components/icons/CloseIC";
import DetailIC from "@/components/icons/DetailIC";

import { getImageURL } from "@/libs/utils";

const MessagingBox = (props: {
  isChatOpened: boolean;
  setIsChatOpened: Function;
  user: any;
}) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const [channel, setChannel] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [isShiftEntered, setIsShiftEntered] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  const startChatSession = async (selectedUser: any) => {
    await chatKitty.endSession();

    const data = await chatKitty.startSession({
      username: props.user?.email,
    });

    if (data.succeeded) {
      const result = await chatKitty.createChannel({
        type: "DIRECT",
        members: [{ username: selectedUser.email }],
      });

      if (result.succeeded) {
        //@ts-ignore
        const channel = result.channel;
        setChannel(channel);
        try {
          const messageCollection = await chatKitty.getMessages({
            channel: channel,
          });
          //@ts-ignore
          const messages = messageCollection.paginator.items;
          const sortedMessages = messages.sort((a: any, b: any) => {
            const timeA = new Date(a.createdTime).getTime();
            const timeB = new Date(b.createdTime).getTime();
            return timeA - timeB;
          });
          setMessages(sortedMessages);
          setIsLoading(false);
        } catch (e: any) {
          setMessages([]);
          setIsLoading(false);
        }
      }

      if (result.failed) {
        //@ts-ignore
        const error = result.error;
      }
    }
  };

  const handleUserSelect = (user: any) => {
    setIsLoading(true);
    setSelectedUser(user);
    startChatSession(user);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) {
      return;
    }
    const result = await chatKitty.sendMessage({
      channel: channel,
      body: message,
    });

    if (result.succeeded) {
      //@ts-ignore
      setMsg("");
    }

    if (result.failed) {
      //@ts-ignore
      const error = result.error;
    }
  };

  return (
    <div
      className={`messaging flex flex-col w-[300px] xs:w-[360px] top-0 mx-auto z-[60] rounded-t-lg`}
    >
      <div className="flex items-center justify-between w-full px-4 py-3 rounded-t-lg bg-primary bg-opacity-80">
        <div className="flex items-center space-x-3">
          <div className="relative w-[38px] h-[38px]">
            <Image
              src={
                props.user?.avatar
                  ? getImageURL(props.user?.avatar)
                  : "/images/default_avatar.png"
              }
              className="rounded-full object-cover border border-1.5 border-primary object-top bg-white"
              alt="user avatar"
              fill
            />
          </div>
          <h1 className="text-lg text-white">Messaging</h1>
          {authContext.totalUnreadCnt != 0 && (
            <div className="w-[20px] h-[20px] bg-[#cb112d] text-white rounded-full flex items-center justify-center">
              {authContext.totalUnreadCnt}
            </div>
          )}
        </div>
        <CloseIC
          className="cursor-pointer bi bi-x"
          fill="#fff"
          onClick={() => props.setIsChatOpened(false)}
        />
      </div>
      {selectedUser != null ? (
        <button
          className="flex items-center px-5 py-3 cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <span>
            <Image
              width={16}
              height={16}
              src="/images/back-icon.svg"
              alt="back"
            />
          </span>
          <span className="text-base font-medium leading-5 text-white">
            &nbsp;&nbsp;Back
          </span>
        </button>
      ) : (
        <div className="flex items-center justify-between px-5 mx-5 mt-4 border-2 border-white rounded-lg">
          <div className="flex items-center">
            <SearchIC
              stroke="#fff"
              width={18}
              height={18}
              className="bi bi-search"
            />
            <input
              type="text"
              className="py-2 text-white bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none"
              placeholder="Search"
              value={searchKey}
              onChange={(e: any) => {
                setSearchKey(e.target.value);
              }}
            />
          </div>
          <DetailIC fill="#fff" className="white bi bi-list-ul" />
        </div>
      )}
      <div className="h-full px-4 pb-6 mt-3">
        {selectedUser == null && (
          <div className="w-full h-[440px]">
            {props.user == null ? (
              <div className="flex items-center w-full h-full">
                <SmallSpinner />
              </div>
            ) : (
              <ChatUserList
                user={props.user}
                onUserSelect={handleUserSelect}
                searchKey={searchKey}
              />
            )}
          </div>
        )}
        {selectedUser && (
          <div className="w-full h-[440px]">
            {!isLoading ? (
              <div className="relative w-full h-full">
                <ChatInterface
                  messages={messages}
                  setMessages={setMessages}
                  user={props.user}
                  selectedUser={selectedUser}
                  channel={channel}
                  setSession={setSession}
                  isShiftEntered={isShiftEntered}
                />
                <div className="absolute bottom-[-30px] left-0 flex items-center w-full space-x-4">
                  <textarea
                    className={`w-full ${
                      isShiftEntered ? "h-20" : "h-10"
                    } py-2 pl-2 pr-8 border border-[#2E2E2E] rounded-lg scrollbar-hide bg-[#0D0D0D] text-white`}
                    value={msg}
                    onChange={(e: any) => {
                      setMsg(e.target.value);
                      if (!e.target.value.includes("\n")) {
                        setIsShiftEntered(false);
                      }
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(msg);
                      } else if (e.key === "Enter" && e.shiftKey) {
                        setIsShiftEntered(true);
                      }
                    }}
                    placeholder="Write a message..."
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/send.svg"
                    alt="send-icon"
                    onClick={() => handleSendMessage(msg)}
                    className="absolute cursor-pointer top-3 right-2"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center w-full h-full">
                <SmallSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingBox;
