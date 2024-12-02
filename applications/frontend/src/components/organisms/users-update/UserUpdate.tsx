"use client";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import * as Yup from "yup";
import { IUser } from "@/@types/user";
// import { handleAxiosError } from "@/utils/axiosErrorhandler";
// import { useRouter } from "next/navigation";
// import axios from "axios";
interface UserDataProps {
  authState: { isAuth: boolean; user: IUser | null };
}

const UserUpdate: FC<UserDataProps> = ({ authState }) => {
  const DEFAULT_FORM_VALUE = {
    first_name: authState.user?.first_name || "",
    last_name: authState.user?.last_name || "",
    picture: authState?.user?.picture || "",
    email: authState.user?.email || "",
  };

  // const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUE);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (imageFile) {
      if (imageFile.size > 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          picture: "Profile size is too large",
        }));
        setPreviewURL(null);
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setFormData({ ...formData, picture: imageUrl });
        setPreviewURL(imageUrl);
        setErrors((prevErrors) => ({ ...prevErrors, picture: "" }));
      }
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email(),
    picture: Yup.string().required("Please upload an image"),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await UpdateUserSchema.validate(formData, { abortEarly: false });

      setErrors({});
      // Submit form data to the server or perform any action here.
      console.log("Form data submitted:", formData);
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

  // const fetchData = async () => {
  //   try {
  //     const apiUrl =
  //       process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
  //     const API_ENDPOINT = `${apiUrl}/v1/teachers/become-teacher`;
  //     const response = await axios.post(API_ENDPOINT, formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     console.log("Log respone: ", response);
  //     if (response.data.errors) {
  //       console.log("An error occurred: teachers ", response.data.errors);
  //       return false;
  //     }

  //     router.push(`/teachers/${response.data.data._id}`);
  //   } catch (error) {
  //     console.log(error);
  //     handleAxiosError(error, {
  //       logError: (message) => {
  //         console.log(`error message`, message);
  //       },
  //       handleErrorResponse(response) {
  //         const { errors } = response.data;

  //         if (errors) {
  //           setErrors({ serverError: errors.message });
  //         }
  //       },
  //     });
  //   }
  // };
  // fetchData()
  return (
    <div className="w-full md:w-[80%]">
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-32">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black ">
                  Personal account
                </h3>
              </div>
              <div className="p-7 ">
                <form
                  action="#"
                  className="flex flex-col gap-8"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-5.5 flex flex-col justify-between gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-[45%]">
                      <label
                        className=" block text-sm font-medium text-black "
                        htmlFor="fullName"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-2 top-3">
                          <svg
                            className="fill-current"
                            width="16"
                            height="22"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        {authState.isAuth && (
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-8 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={onChangeInput}
                            defaultValue="Devid Jhon"
                          />
                        )}
                      </div>
                      {errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {errors.first_name}
                        </p>
                      )}
                    </div>

                    <div className="w-full sm:w-[45%]">
                      <label
                        className=" block text-sm font-medium text-black"
                        htmlFor="fullName"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-2 top-3">
                          <svg
                            className="fill-current"
                            width="16"
                            height="22"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        {authState.isAuth && (
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-8 text-sm text-black focus:border-primary focus-visible:outline-none "
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={onChangeInput}
                            defaultValue="Devid Jhon"
                          />
                        )}
                      </div>
                      {errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {errors.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className=" block text-sm font-medium text-black "
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-3">
                        <svg
                          className="fill-current"
                          width="16"
                          height="22"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      {authState.isAuth && (
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-8 pr-4.5 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={onChangeInput}
                          placeholder="example@gmail.com"
                          disabled
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      className="flex justify-center items-center rounded border border-stroke py-2 px-3 text-sm font-medium text-black hover:shadow-1 dark:border-strokedark "
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600  flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black ">
                  profile
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      {!previewURL ? (
                        <Image
                          className="rounded-full w-full h-full"
                          src={authState.user?.picture ?? "/default-avatar.png"}
                          alt="Bordered avatar"
                          width={50}
                          height={50}
                        />
                      ) : (
                        previewURL && (
                          <Image
                            src={previewURL}
                            alt="Preview"
                            className="w-full h-full rounded-full"
                            width={50}
                            height={50}
                          />
                        )
                      )}
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit profile
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      name="picture"
                      ref={inputFileRef}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                    </div>
                  </div>
                  {errors.picture && (
                    <p className="text-red-500 text-sm">{errors.picture}</p>
                  )}
                  <div className="flex justify-end gap-4 pt-1">
                    <button
                      className="flex justify-center items-center rounded border border-stroke py-2 px-3 text-sm font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600  flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
