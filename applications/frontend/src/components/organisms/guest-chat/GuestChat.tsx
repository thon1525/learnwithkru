import Image from "next/image";
import React, { ReactNode } from "react";

interface GuestChatProp {
  name?: string;
  time?: string;
  children?: ReactNode;
  src?: string;
}

interface MessProp{
    messages: string
}

const MessageGuestChat: React.FC<MessProp> = ({messages}) => {
  return (
    <div className="bg-gray-100 border rounded-l-none rounded-b-lg border-gray-300 rounded-lg p-3 flex flex-row w-[480px]">
      <p className="text-gray-800">
      {messages}
      </p>
    </div>
  );
};

const GuestChat: React.FC<GuestChatProp> = ({ name, time, children ,src}) => {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col">
        <Image
          src={
            `${src}`
          }
          alt={"this all"}
          className="w-[50px] h-[50px] rounded-full"
          width={180}
          height={180}
        ></Image>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row py-[5px] px-[18px]">
          <small>{name}</small>
          <small className="px-[20px]">{time}</small>
        </div>
        <div className="flex px-[18px]">{children}</div>
      </div>
    </div>
  );
};

export { GuestChat,MessageGuestChat};
