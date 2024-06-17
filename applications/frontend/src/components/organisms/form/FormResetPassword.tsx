"use client";
import { ComfirmPasswordType } from "@/@types/forgetPasswordType";
import { Button, InputForm } from "@/components";
import * as Yup from "yup";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { ComfirmPassword } from "@/schema/forgetPasswordSchema";
const DEFAULT_FORM_VALUE = {
  password: "",
  re_password: "",
};
const FormResetPassword = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [formData, setFormData] =
    useState<ComfirmPasswordType>(DEFAULT_FORM_VALUE);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRepassword(!showRepassword);
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
      await ComfirmPassword.validate(formData, { abortEarly: false });
      addRestePassword(formData);
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
  const addRestePassword = (users: ComfirmPasswordType) => {
    // stept 5
    const fetchData = async (usersData: ComfirmPasswordType) => {
      try {
        if (usersData.password !== usersData.re_password) {
        }

        // const data = JSON.stringify(usersData);
        // const response = await axios.post(
        //   "http://localhost:3001/api/v1/auth/login",
        //   data,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        // alert(response.status);
      } catch (error) {}
    };

    fetchData(users);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <div className="relative w-[420px]">
            <InputForm
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-purple-500  outline-none text-xs"
              name="password"
              borderRadius="md"
              borderSize="forgetpassword"
              value={formData.password}
              onChange={onChangeInput}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute mr-3  right-2 top-3">
              {showPassword ? (
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
              <small className="mt-2" style={{ color: "red" }}>
                {errors.password}
              </small>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-3">
          <div className="relative w-[420px]">
            <InputForm
              type={showRepassword ? "text" : "password"}
              placeholder="Re-Password"
              className="border border-purple-500  outline-none text-xs"
              name="re_password"
              borderRadius="md"
              borderSize="forgetpassword"
              value={formData.re_password}
              onChange={onChangeInput}
            />

            <button
              type="button"
              onClick={toggleRePasswordVisibility}
              className="absolute mr-3  right-2 top-3">
              {showRepassword ? (
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
          {errors.re_password && (
            <div className="flexl justify-start">
              <small className="mt-2" style={{ color: "red" }}>
                {errors.re_password}
              </small>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center py-5">
        <Button className="w-[50%] h-[45px] mb-3" radius="md" type="submit">
          Forgot password
        </Button>
      </div>
    </form>
  );
};

export default FormResetPassword;
