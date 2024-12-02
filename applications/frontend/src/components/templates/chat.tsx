"use client";
import React, { useState } from "react";
import {
  ChatInput,
  ChatSlidebar,
  GuestChat,
  MessageGuestChat,
  MessagePersonalChat,
  NavChat,
  PersonalChat,
} from "../organisms";
import { AudioRecording, ChatProp } from "@/@types/chat/chatType";
const DEFAULT_FORM_VALUE = {
  message: "",
};
const Chat: React.FC = () => {
  const [recordings, setRecordings] = useState<AudioRecording[]>([]);
  const [formData, setFormData] = useState<ChatProp>(DEFAULT_FORM_VALUE);
  return (
    <div className="grid  lg:grid-cols-[400px_650px] w-full h-auto lg:w-[1024px] ">
      <div className="bg-[#FFFFFF] shadow-md border">
        <ChatSlidebar />
      </div>
      <div className="bg-[#c9c5c5a8] ">
        <div className="flex justify-center ">
          <NavChat className="w-[638px]" />
        </div>
        <div className="flex py-[40px] px-[18px]">
          <GuestChat
            name="thon"
            time="10:90 AM"
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          >
            <MessageGuestChat messages="Material Tailwind is a components library that combines " />
          </GuestChat>
        </div>
        <div className="flex py-[10px] px-[18px] justify-end">
          <PersonalChat
            name="thon"
            time="10:90 AM"
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          >
            <MessagePersonalChat messages={formData.message} />
            {recordings.map((recording) => (
              <div key={recording.id}>
                <audio controls src={recording.audioURL}></audio>
              </div>
            ))}
          </PersonalChat>
        </div>
        <div className="flex py-[20px] w-[650px] bg-[#FFFFFF] shadow-md border h-[60px] items-center">
          <ChatInput setRecordings={setRecordings} setFormData={setFormData} formData={formData}/>
        </div>
      </div>
    </div>
  );
};

export default Chat;
