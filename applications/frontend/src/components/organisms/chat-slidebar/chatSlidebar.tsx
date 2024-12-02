import {
  ChatTitle,
  IconClip,
  ListCardChat,
  SearchChat,
  Typography,
} from "@/components";
import React from "react";
const chatList = [
  {
    src: "https://cdn1.vectorstock.com/i/1000x1000/85/05/profile-icon-female-head-in-chat-bubble-isolated-vector-23798505.jpg",
    name: "thon nnnnnnnnnn",
    repply: "hello",
    time: "10:23AM",
  },
  {
    src: "https://cdn1.vectorstock.com/i/1000x1000/85/05/profile-icon-female-head-in-chat-bubble-isolated-vector-23798505.jpg",
    name: "John Doe",
    repply: "hi there",
    time: "10:25AM",
  },
];
const ChatSlidebar: React.FC = () => {
  return (
    <div className="grid grid-rows-4 px-[20px]">
      <ChatTitle className="py-[10px]" />
      <SearchChat />
      <div className="flex justify-start">
        <div className="flex flex-col">
          <IconClip />
        </div>
        <div className="flex flex-col">
          <Typography tags="p">PINNED CHATS</Typography>
        </div>
      </div>
        {chatList.map((chat, index) => (
         <div className="pt-[10px] "      key={index}>
             <ListCardChat
       
            src={chat.src}
            name={chat.name}
            repply={chat.repply}
            time={chat.time}
          />
         </div>   
       
        ))}
    </div>
  );
};

export default ChatSlidebar;
