import { useEffect, useRef, useContext } from "react";
import Image from "next/image";

import { AuthContext } from "@/contexts/AuthContext";

import chatKitty from "@/components/chat/chatkitty";

import { formatDate, getImageURL, parseMessageBody } from "@/libs/utils";

type Props = {
  messages: Array<any>;
  setMessages: Function;
  user: any;
  selectedUser: any;
  channel: any;
  setSession: Function;
  isShiftEntered: boolean;
};

const ChatInterface = ({
  messages,
  setMessages,
  user,
  selectedUser,
  channel,
  setSession,
  isShiftEntered,
}: Props) => {
  const scrollRef = useRef(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    // start real-time chat session
    let result = chatKitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        if (authContext.receiveCnt == 0) {
          authContext.setReceiveCnt(authContext.receiveCnt++);
          setMessages((messages: Array<any>) => [...messages, message]);
        } else {
          authContext.setReceiveCnt(authContext.receiveCnt--);
        }
      },
    });
    if (result.succeeded) {
      setSession(result.session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      //@ts-ignore
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    for (let item of messages) {
      if (selectedUser.email == item.user.name) {
        chatKitty.readMessage({ message: item });
      }
    }
    let unreadArr = authContext.unreadArr
      .slice()
      .filter((item: any) => item.email != selectedUser.email);
    authContext.setUnreadArr(unreadArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div
      className={`w-full ${
        isShiftEntered ? "h2-message-area" : "h1-message-area"
      } text-base whitespace-nowrap overflow-auto overflow-x-hidden text-white  scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-700 scrollbar-thumb-rounded-br-xl scrollbar-track-rounded-tr-xl`}
      ref={scrollRef}
    >
      {messages.map((message: any, index: number) => (
        <div className="w-full px-1 py-1" key={index}>
          {user.email == message?.user?.name ? (
            <div className="w-full">
              <div className="flex items-end justify-end w-full space-x-2">
                <div>
                  <p className="w-full text-sm text-right">
                    <span>You</span>
                    &nbsp;&nbsp;
                    <span className="text-xs text-[#DEDEDE]">
                      {formatDate(message?.createdTime)}
                    </span>
                  </p>
                  <div
                    className="max-w-[250px] min-h-[30px] bg-primary text-white py-1 px-3 rounded leading-6 whitespace-normal break-words"
                    dangerouslySetInnerHTML={{
                      __html: parseMessageBody(message?.body),
                    }}
                  ></div>
                </div>
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={
                      user?.avatar
                        ? getImageURL(user.avatar)
                        : message?.user?.displayPictureUrl
                    }
                    alt="user"
                    className="object-cover bg-white rounded-full"
                    fill
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-end justify-start w-full space-x-2">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={
                      selectedUser?.avatar
                        ? getImageURL(selectedUser?.avatar)
                        : message?.user?.displayPictureUrl
                    }
                    alt="user"
                    className="object-cover w-full h-full bg-white rounded-full"
                    fill
                  />
                </div>
                <div>
                  <p className="text-sm text-left">
                    <span>
                      {selectedUser.firstname}&nbsp;
                      {selectedUser.lastname.slice(0, 1) + "."}
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-xs text-[#DEDEDE]">
                      {formatDate(message?.createdTime)}
                    </span>
                  </p>
                  <div
                    className="max-w-[250px] min-h-[30px] text-white py-1 px-3 rounded leading-6 whitespace-normal break-words"
                    style={{ background: "rgba(46, 46, 46, 0.60)" }}
                    dangerouslySetInnerHTML={{
                      __html: parseMessageBody(message?.body),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
