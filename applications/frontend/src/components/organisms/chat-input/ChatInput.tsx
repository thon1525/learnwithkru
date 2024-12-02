"use client";
import {   VoiceProps } from "@/@types/chat/chatType";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { GrEmoji } from "react-icons/gr";
import { MdOutlineAttachFile } from "react-icons/md";
import * as Yup from "yup";
import { PiTelegramLogo } from "react-icons/pi";
import { ChatMessages } from "@/schema/chatValidate";
import { VoiceInput } from "@/components";
import axios from "axios";

const ChatInput: React.FC<VoiceProps> = ({setRecordings,setFormData,formData}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [formData, setFormData] = useState<ChatProp>(DEFAULT_FORM_VALUE);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      // stept 3
      await ChatMessages.validate(formData, { abortEarly: false });
      console.log("user ",formData)
      fetchSignupData()
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

// feth data
const fetchSignupData = async (): Promise<void> => {
  try {
    console.log(formData)
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    await axios.post(`${API_BASE_URL}/v1/students/chat/teacher`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error(error)
  }
};


  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <div className="flex justify-between w-[650px] p-2 bg-white rounded-lg shadow-md">
        <div className="flex items-center flex-grow space-x-2">
          <GrEmoji className="w-6 h-6 cursor-pointer" aria-label="Emoji" />
          <input
            type="text"
            placeholder="Type message..."
            className="flex-grow px-2 py-1 border-none rounded focus:outline-none"
            name="message"
            value={formData.message}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* <MdKeyboardVoice
            className="w-6 h-6 cursor-pointer"
            aria-label="Voice message"
          /> */}
            <VoiceInput  setRecordings={setRecordings} />
            <label htmlFor="file-upload" className="file-upload-label">
              <MdOutlineAttachFile
                className="w-6 h-6 cursor-pointer"
                aria-label="Attach file"
              />
              <input
                id="file-upload"
                type="file"
                className="file-input"
                style={{ display: "none" }}
              />
            </label>

          <div className="flex flex-row ">
            <button
              className="bg-[#00A3FF] w-[65px] h-[40px] rounded-lg border"
              type="submit"
            >
              <div className="flex justify-center">
                <p className="text-[#FFFFFF]">Send</p>
                <div className="flex flex-row items-center ml-[2px]">
                  <PiTelegramLogo className="text-[#FFFFFF] " />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
