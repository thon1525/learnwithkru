import { ReactNode } from "react";
import Image from "next/image";

interface PersonalChatProp {
  name?: string;
  time?: string;
  children?: ReactNode;
  src?: string;
}

interface PersonalProp {
  messages: string;
}

const MessagePersonalChat: React.FC<PersonalProp> = ({ messages }) => {
  return (
    <div className={` ${messages && `text-white rounded-l-lg rounded-b-lg p-3 max-w-xs shadow-md bg-blue-500`} `}>
      <p>{messages}</p>
    </div>
  );
};

const PersonalChat: React.FC<PersonalChatProp> = ({
  src,
  name,
  children,
  time,
}) => {
  return (
    <div className="flex justify-end items-center space-x-2 p-2 ">
      <div className="flex flex-col items-end ">
        <div className="text-xs text-gray-500 mt-[5px]">
          <span className="">{time}</span>
          <span className="ml-2 ">{name}</span>
        </div>
        <div className="mt-1">
          {children}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Image
          src={src || "/default-avatar.png"}
          alt="Profile picture"
          className="w-[50px] h-[50px] rounded-full"
          width={180}
          height={180}
        />
      </div>
    </div>
  );
};

export { PersonalChat, MessagePersonalChat };
