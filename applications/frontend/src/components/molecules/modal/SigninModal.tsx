"use client"

import { UsersFormLogin } from '@/@types/users/users';
import { AuthValidateLoginSchema } from '@/schema/UserValidateSchema';
import { handleAxiosError } from '@/utils/axiosErrorhandler';
import { setLocalStorage } from '@/utils/localStorage';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, FormEventHandler, SetStateAction, useState } from 'react';
import * as Yup from "yup";


export default function SignInModal({isPopup, isAuth, setIsPopup}:{isPopup: boolean, isAuth: boolean , setIsPopup: React.Dispatch<SetStateAction<boolean>>}) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error , setError] = useState<{[key: string]: string}>({})
  const [formData, setFormData] = useState<UsersFormLogin>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(true);
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
          return false
        }
        router.push('/')
        // window.location.href = "http://localhost:8000/teacher-list"
      }  catch (error: unknown) {
        handleAxiosError(error, {
        
          handleErrorResponse: (response) => {
            // Custom response handling
            const {errors}= response.data
            if(errors){
              setError({server: errors.message})
            }
            
          }
        });
    }finally{
      window.location.reload()
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
    <>
      {/* <button
        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => setIsPopup(true)}
      >
        Sign In
      </button> */}
      {isPopup && !isAuth && (
        <div
          className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsPopup(false)}
        >
          <div
            className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            onClick={e => e.stopPropagation()}
          > 
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Sign In
              </h4>
              <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Enter your email and password to Sign In.
              </p>
              <label className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit" htmlFor='email' >
                Your Email
              </label>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                onChange={onChangeInput}
                 id='email'
                 name='email'
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-transparent focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Your Email"
                />
                <label htmlFor='email' className="absolute left-3 -top-1.5 text-sm font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-sm peer-focus:text-gray-900">
                  Email
                </label>


                {errors.email && (
          <div className="flex justify-start">
            <small className="mt-2 text-xs text-red-500" >
              {errors.email}
            </small>
          </div>
        )}

              </div>
              <label className={`block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit ${errors.email && "pt-8"}`} htmlFor='password'>
                Your Password
              </label>

              
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                onChange={onChangeInput}
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-transparent focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Your Password"
                />
                <label htmlFor='password' className="absolute left-3 -top-1.5 text-sm font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-sm peer-focus:text-gray-900">
                  Password
                </label>

                <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute mr-3  right-2 top-2">
            {!showPassword ? (
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

                {errors.password && (
          <div className="flex justify-start">
            <small className="mt-2 text-xs text-red-500" >
              {errors.password}
            </small>
          </div>
        )}

{error.server && (
          <div className="flex justify-start">
            <small className="mt-2 text-xs text-red-500" >
              {error.server}
            </small>
          </div>
        )}

              </div>
              <div className={`-ml-2.5 -mt-3 ${error.server || errors.password && "pt-10"}`}>
                <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="remember">
      <input
        id="remember"
        type='checkbox'
        className="hidden"
        onChange={handleCheckboxChange}
        checked={rememberMe}
      />
      <div className={`relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all ${rememberMe ? 'bg-gray-900 border-gray-900' : 'bg-white border-blue-gray-200'}`}>
        <span className={`absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 ${rememberMe ? 'opacity-100' : 'opacity-0'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </label>
                  <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Sign In
              </button>
              <p className="flex justify-center mt-4 font-sans text-sm antialiased font-light leading-normal text-inherit">
                Don&apos;t have an account?
                <Link href="/signup" className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                  Sign up
                </Link>
              </p>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
