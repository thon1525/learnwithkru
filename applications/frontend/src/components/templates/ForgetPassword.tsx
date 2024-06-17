"use client"
import React, { FormEvent, useState } from "react";
import { Button, InputForm, Typography } from "../atoms";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  // Validation function for email
  const validateEmail = (value: string) => {
    setEmailError("");
    if (!value) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Email is invalid");
    }
  };

  // Validation function for password
  const validatePassword = (value: string) => {
    setPasswordError("");
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    }
  };

  // Validation function for re-entered password
  const validateRePassword = (value: string) => {
    setRePasswordError("");
    if (!value) {
      setRePasswordError("Re-entered password is required");
    } else if (value !== newPassword) {
      setRePasswordError("Passwords do not match");
    }
  };

  // handleChange function to update state for each input and perform validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
    validateRePassword(e.target.value);
  };

  // handleSubmit function to display input values on submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Display input values
    console.log("Email:", email);
    console.log("New Password:", newPassword);
    console.log("Re-entered Password:", rePassword);
  };

  return (
    <>
      <div className="flex flex-col mx-auto mt-10 w-full md:w-[55%] lg:w-[40%] xl:w-[35%] h-[480px] gap-y-5 border items-center rounded-md shadow-lg justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="0.7"
          stroke="rgb(100 116 139)"
          className="w-[64px] h-[64px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <Typography variant="bold">Forgot password?</Typography>
        <Typography>please enter your Email to reset your password.</Typography>

        {/* input form */}

        <div className="flex flex-col w-[80%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputForm
              className="w-full border-gray-400 focus:outline-[#7B2CBF]"
              type="email"
              placeholder="Email"
              borderRadius="md"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <Typography>{emailError}</Typography>}
            <InputForm
              className="w-full border-gray-400 focus:outline-[#7B2CBF]"
              type="password"
              placeholder="New Password"
              borderRadius="md"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {passwordError && <Typography>{passwordError}</Typography>}
            <InputForm
              className="w-full border-gray-400 focus:outline-[#7B2CBF]"
              type="password"
              placeholder="Re-Password"
              borderRadius="md"
              value={rePassword}
              onChange={handleRePasswordChange}
            />
            {rePasswordError && <Typography>{rePasswordError}</Typography>}
            <Typography className="flex justify-start">
              password at least 8 characters
            </Typography>
            <div className="flex justify-center">
              <Button type="submit" className="w-[50%] h-[40px] mb-3" radius="md">
                Forgot password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
