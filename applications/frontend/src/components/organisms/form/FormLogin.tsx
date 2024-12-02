"use client";
import { Button, InputForm } from "@/components";
import * as Yup from "yup";
import { AuthValidateLoginSchema } from "@/schema/UserValidateSchema";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { UsersFormLogin } from "@/@types/users/users";
import axios from "axios";
import { setLocalStorage } from "@/utils/localStorage";
import Link from "next/link";
const DEFAULT_FORM_VALUE = {
  email: "",
  password: "",
};
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utils/axiosErrorhandler";

const FormLogin = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error , setError] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<UsersFormLogin>(DEFAULT_FORM_VALUE);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };
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
    e.preventDefault();
    try {
      await AuthValidateLoginSchema.validate(formData, { abortEarly: false });
      addLoginUsers(formData);
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
  const addLoginUsers = (users: UsersFormLogin) => {
    // stept 5
    const fetchData = async (usersData: UsersFormLogin) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        const data = JSON.stringify(usersData);
        const response = await axios.post(
          `${baseUrl}/v1/auth/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if(response.data.errors){
          console.log("An error accor: ",response.data.errors)
          return false
        }
        router.push('/')
        // window.location.href = "http://localhost:8000/teacher-list"
      }  catch (error: unknown) {
        handleAxiosError(error, {
          logError: (message: string) => {
            // Custom logging implementation, e.g., sending logs to a server
            console.log('Custom log:', message);
          },
          handleErrorResponse: (response) => {
            // Custom response handling
            const {errors}= response.data
            if(errors){
              console.log(errors.message)
              setError({server: errors.message})
            }
            
          }
        });
    }
    finally{
      setIsLoading(false)
    }
    };
    // stept 6
    if (!rememberMe) {
      fetchData(users);
    }
    // stept 7
    const authObject = {
      email: users.email,
    };
    fetchData(users);
    setLocalStorage("user", authObject);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Email</label>
        <InputForm
          type="email"
          placeholder="email"
          borderRadius="md"
          borderSize="btnlogin"
          className="border border-purple-500  pl-3 outline-none text-xs"
          name="email"
          value={formData.email}
          onChange={onChangeInput}
        />
        {errors.email && (
          <div className="flex justify-start">
            <small className="mt-2" style={{ color: "red" }}>
              {errors.email}
            </small>
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <label htmlFor="password">Password</label>
        <div className="relative w-[305px]">
          <InputForm
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-purple-500  pl-3 outline-none text-xs"
            name="password"
            borderRadius="md"
            borderSize="btnlogin"
            value={formData.password}
            onChange={onChangeInput}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute mr-3  right-2 top-2">
            { !showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}{" "}
          </button>
        </div>
        {errors.password && (
          <div className="flexl justify-start">
            <small className="mt-2 text-red-500" >
              {errors.password}
            </small>
          </div>
        )}

{error.server && (
          <div className="flexl justify-start">
            <small className="mt-2 text-red-500" >
              {error.server}
            </small>
          </div>
        )}
      </div>
      <div className=" flex items-center justify-between py-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-[2px]"
            onChange={handleCheckboxChange}
          />
          <small className="text-sm">Remember me</small>
        </div>
        <Link
          className="inline-block align-baseline text-sm hover:underline text-[#455445]"
          href={"/forget-password"}>
          Forgot Password?
        </Link>
      </div>
      <Button
        type="submit"
        radius="md"
        className="hover:bg-violet-700 text-white text-[16px] flex justify-center w-[300px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
        {isLoading ? 'Login...' : 'Login'}
      </Button>
    </form>
  );
};

export default FormLogin;
