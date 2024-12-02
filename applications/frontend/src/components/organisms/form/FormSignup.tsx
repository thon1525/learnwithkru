"use client";
import { AuthForm } from "@/@types/users/users";
import { Button, InputForm } from "@/components";
import * as Yup from "yup";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import Link from "next/link";
import axios from "axios";
import { setLocalStorage } from "@/utils/localStorage";
import { AuthValidateSchema } from "@/schema/UserValidateSchema";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import { useRouter } from "next/navigation";
// TODOLIST
// handle values in a form create state is handle form
// handle error in from  nad create state in handle error
// handle with yup show error in form
// handle  add data with backend and fetch
// handle fetch data with axios
// handle with is not check remember
// handel with remember

const DEFAULT_FORM_VALUE = {
  last_name: "",
  first_name: "",
  email: "",
  password: "",
};
const FormSignup = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const router = useRouter();
  const [error, setError] = useState<{ [key: string]: string | undefined }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthForm>(DEFAULT_FORM_VALUE);
  const [rememberMe, setRememberMe] = useState(false);
  const fetchSignupData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      await axios.post(`${API_BASE_URL}/v1/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/send-verify-email");
    } catch (error: unknown) {
      handleAxiosError(error, {
        
        handleErrorResponse: (response) => {
          // Custom response handling
          const { errors } = response.data;
          if (errors) {
            if (
              errors?.message?.includes("Verification email has been resent")
            ) {
              router.push("/send-verify-email");
              return;
            }
            setError({ server: errors.message });
          }
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      // stept 3
      await AuthValidateSchema.validate(formData, { abortEarly: false });
      await fetchSignupData();

      // stept 4
      const authObject = {
        last_name: formData.last_name,
        first_name: formData.first_name,
        email: formData.email,
      };
      setLocalStorage("user", authObject);

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

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // stept 1
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      // stept 2
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <div className="flex">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="">First Name</label>
          <InputForm
            type="text"
            placeholder="First Name"
            className="border border-purple-500 rounded-md w-[360px] h-[40px] pl-3 outline-none text-xs"
            name="first_name"
            value={formData.first_name}
            onChange={onChangeInput}
          />
          {errors.first_name && (
            <div className="flex justify-start">
              <small className="mt-2" style={{ color: "red" }}>
                {errors.first_name}
              </small>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Last Name</label>
          <InputForm
            type="text"
            placeholder="Last Name"
            className="border border-purple-500 rounded-md w-[360px] h-[40px] pl-3 outline-none text-xs"
            name="last_name"
            value={formData.last_name}
            onChange={onChangeInput}
          />
          {errors.last_name && (
            <div className="flex justify-start">
              <small className="mt-2" style={{ color: "red" }}>
                {errors.last_name}
              </small>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Email</label>
          <InputForm
            type="email"
            placeholder="email"
            className="border border-purple-500 rounded-md w-[360px] h-[40px] pl-3 outline-none text-xs"
            name="email"
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
          <div className="relative w-[360px]">
            <InputForm
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-purple-500 rounded-md w-[360px] h-[40px] pl-3 outline-none text-xs"
              name="password"
              value={formData.password}
              onChange={onChangeInput}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2"
            >
              { !showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}{" "}
            </button>
          </div>
          {errors.password && (
            <div className="flex justify-start">
              <small className="mt-2  h-2" style={{ color: "red" }}>
                {errors.password}
              </small>
            </div>
          )}
          {error.server && (
            <div className="flex justify-start">
              <small className="mt-2  h-2" style={{ color: "red" }}>
                {error.server}
              </small>
            </div>
          )}
        </div>
        <div className=" flex items-center  justify-between my-5 mb-[10px]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              className=" outline-none"
              onChange={handleCheckboxChange}
            />
            <p className="text-sm">Remember me</p>
          </div>
          <Link
            href={"/login"}
            className="inline-block align-baseline text-xs hover:underline   text-[#455445]"
          >
            Already have an account?
          </Link>
        </div>
        <Button type="submit" radius="md" className="w-full py-2.5 text-sm">
          {isLoading ? "Sig up  ....." : "Sign up"}
        </Button>
      </form>
    </div>
  );
};

export default FormSignup;
