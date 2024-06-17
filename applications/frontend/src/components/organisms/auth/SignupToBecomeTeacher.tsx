"use client";
import React, {
  ChangeEvent,
  useState,
  FormEventHandler,
  FormEvent,
} from "react";
import { Image } from "@nextui-org/react";
import { Button, InputForm, Typography } from "@/components/atoms";
import { TeacherSignup } from "@/schema/becomeTeacher";
import * as Yup from "yup"; // Ensure Yup is imported
import axios from "axios";

// SVG Icon components
const GoogleIcon = () => (
  // GoogleIcon
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2202_1265)">
      <path
        d="M12.4998 9.81836V14.4656H18.9579C18.6743 15.9602 17.8233 17.2257 16.547 18.0766L20.4415 21.0984C22.7106 19.0039 24.0197 15.9276 24.0197 12.273C24.0197 11.4221 23.9433 10.6039 23.8015 9.81849L12.4998 9.81836Z"
        fill="#4285F4"
      />
      <path
        d="M5.77461 14.2842L4.89625 14.9566L1.78711 17.3783C3.76165 21.2947 7.80862 24.0002 12.4995 24.0002C15.7394 24.0002 18.4557 22.9311 20.4412 21.0984L16.5467 18.0765C15.4776 18.7965 14.114 19.2329 12.4995 19.2329C9.37951 19.2329 6.72868 17.1275 5.77952 14.2911L5.77461 14.2842Z"
        fill="#34A853"
      />
      <path
        d="M1.78718 6.62158C0.969042 8.23606 0.5 10.0579 0.5 11.9997C0.5 13.9415 0.969042 15.7633 1.78718 17.3778C1.78718 17.3886 5.77997 14.2796 5.77997 14.2796C5.53998 13.5596 5.39812 12.796 5.39812 11.9996C5.39812 11.2031 5.53998 10.4395 5.77997 9.71951L1.78718 6.62158Z"
        fill="#FBBC05"
      />
      <path
        d="M12.4997 4.77818C14.267 4.77818 15.8379 5.38907 17.0925 6.56727L20.5288 3.13095C18.4452 1.18917 15.7398 0 12.4997 0C7.80887 0 3.76165 2.69454 1.78711 6.62183L5.77978 9.72001C6.72882 6.88362 9.37976 4.77818 12.4997 4.77818Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_2202_1265">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const FacebookIcon = () => (
  // FacebookIcon
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.5 12C24.5 5.37264 19.1274 0 12.5 0C5.87264 0 0.5 5.37264 0.5 12C0.5 17.6275 4.37456 22.3498 9.60128 23.6467V15.6672H7.12688V12H9.60128V10.4198C9.60128 6.33552 11.4498 4.4424 15.4597 4.4424C16.22 4.4424 17.5318 4.59168 18.0685 4.74048V8.06448C17.7853 8.03472 17.2933 8.01984 16.6822 8.01984C14.7147 8.01984 13.9544 8.76528 13.9544 10.703V12H17.8741L17.2006 15.6672H13.9544V23.9122C19.8963 23.1946 24.5005 18.1354 24.5005 12H24.5Z"
      fill="#0866FF"
    />
  </svg>
);

const SignupToBecomeTeacher = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(`${name}: ${value}`);  // Log the input value to the console
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await TeacherSignup.validate(values, { abortEarly: false });
      setErrors({});
      await handlePostTeacher(values);
      // Proceed with form submission (e.g., send data to server)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };
  const handlePostTeacher = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      const API_ENDPOINT = "http://localhost:3000/v1/teachers/become-teacher"; // Replace with your actual API endpoint
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.errors) {
        console.log("An error accor: ", response.data.errors);
        return new Error(response.data.errors);
      }

      setValues(response.data.data);
    } catch (error) {
      console.error("Error occurred during fetch Teacher Data:", error);
    }
  };

  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const handleSignIn = async (provider: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD || "https://api.learnwithkru.com"
      const url = `${apiUrl}/v1/teachers/become-teacher`;
      const response = await axios.post(url, { provider }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Handle successful sign-in (e.g., redirect to a dashboard or another page)
      return response.data;
    } catch (error) {
      if (provider === "google") {
        setGoogleLoading(false);
      } else if (provider === "facebook") {
        setFacebookLoading(false);
      }
      console.error("Signin failed:", error);
      // Handle error response
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full sm:w-[75%] md:w-[60%] lg:w-[150vh] flex xl:justify-center justify-center items-center xl:gap-20">
        <div className="w-[80%] md:w-full lg:w-[35%] grid lg:grid-flow-row gap-4">
          <Typography align="left" fontSize="lg" variant="bold">
            Sign up to become a teacher now
          </Typography>
          <Typography align="left">
            You must fill out all the form conditions to become a teacher in our
            community.
          </Typography>

          <form
            className="w-full lg:w-full lg:grid lg:grid-flow-row lg:gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Typography className="flex justify-start">Email</Typography>
              <InputForm
                type="text"
                placeholder="example@gmail.com"
                borderColor="primary"
                className="w-full outline-none"
                value={values.email}
                name="email"
                onChange={onChangeInput}
              />
              {errors.email && (
                <Typography className="text-red-500 flex justify-items-start">
                  {errors.email}
                </Typography>
              )}
            </div>
            <div>
              <Typography className="flex justify-start">Password</Typography>
              <InputForm
                type="password"
                placeholder="password"
                borderColor="primary"
                className="w-full outline-none"
                value={values.password}
                name="password"
                onChange={onChangeInput}
              />
              {errors.password && (
                <Typography className="text-red-500 flex justify-items-start">
                  {errors.password}
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              colorScheme="primary"
              fontColor="white"
              fontSize="lg"
              className="py-[8px] md:py-2 w-full mt-4 text-sm"
            >
              Signup
            </Button>
          </form>
          <div className="w-full flex items-center justify-between">
            <div className="border-black border-b w-[40%]"></div>
            <Typography>or</Typography>
            <div className="border-black border-b w-[40%]"></div>
          </div>

          <div className="w-full grid items-center grid-flow-row gap-4">
            <Button
              className="grid justify-center items-center grid-flow-col gap-5 text-sm max-[640px]:text-md py-[9px]"
              leftIcon={<GoogleIcon />}
              colorScheme="tertiary"
              fontColor="black"
              fontSize="lg"
              onClick={() => handleSignIn("google")}
            >
              <div className="text-sm text-slate-950 mr-[20px] ">
                {" "}
                <p className="text-sm text-slate-950  ">
                  {googleLoading ? "Signing in..." : "continue in with Google"}
                </p>  
              </div>
              {/* <Link href="/become-teacher/become-teacher-step">Continue with Google</Link> */}
            </Button>
            <Button
              className="grid justify-center items-center grid-flow-col gap-x-1 text-sm py-[9px]"
              leftIcon={<FacebookIcon />}
              colorScheme="tertiary"
              fontColor="black"
              fontSize="lg"
              onClick={() => handleSignIn("facebook")}
            >

              <div className="text-sm text-slate-950 mr-[9px] ">

                <p className="text-sm text-slate-950 pl-4 ">
                  {facebookLoading
                    ? "Signing in..."
                    : "continue in with FaceBook"}
                </p>
              </div>
              {/* <Link href="/become-teacher/become-teacher-step">Continue with Facebook</Link> */}
            </Button>
          </div>
        </div>
        <Image
          className="w-[100%] hidden xl:block"
          src={"/Benner/teacher-signup.png"}
          alt="Sign up to become a teacher"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default SignupToBecomeTeacher;
