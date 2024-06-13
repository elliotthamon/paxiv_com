import ChatKitty from "chatkitty";

const chatKitty = ChatKitty.getInstance(
  process.env.NEXT_PUBLIC_CHATKITTY_API_KEY || ""
);

export default chatKitty;
