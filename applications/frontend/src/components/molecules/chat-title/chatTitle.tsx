import { Typography } from "@/components/atoms"
import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

interface ChatTitile{
    className?: string;
}

const ChatTitle: React.FC<ChatTitile>=({className})=>{
    return (
     <div className={`flex justify-start ${className} `}>
        <div className="flex flex-col">
            <BsFillChatDotsFill className="w-[24px] h-[24px]"/>
        </div>
        <div className="flex flex-col">
            <Typography tags="p">
                Chat with kru
            </Typography>
        </div>
     </div>
    )
}

export  default ChatTitle