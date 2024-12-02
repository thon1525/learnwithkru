import { Typography } from "@/components/atoms"
import Image from "next/image"
import React from "react"


const ChatProfile:React.FC =()=>{
    return (
        <div className="flex justify-start ">
           <div className="flex flex-col px-[18px] py-[2px]">
              <Image src={"https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="} alt={"this all"} className="w-[50px] h-[50px] rounded-full" width={180} height={180} ></Image>
           </div>
           <div className="flex flex-col  py-[2px]">
                <Typography tags="h4">Grace Miller</Typography>
              <small className="text-[#00A3FF]">Online</small>
           </div>
        </div>
    )
}

export  default ChatProfile