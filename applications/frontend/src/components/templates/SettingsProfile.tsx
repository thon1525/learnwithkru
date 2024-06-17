"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Button, InputForm, Typography } from "../atoms";
import {
  validationSchema,
  validationTeacher,
} from "@/schema/editProfileSchema";
import { Select } from "../atoms/select/select";


// const MenuItem: React.FC<MenuItemProps> = ({
//   itemName,
//   active,
//   handleClick,
// }) => {
//   return (
//     <Link
//       onClick={() => handleClick(itemName)}
//       className={`cursor-pointer text-[20px] sm:text-[20px] md:text-[16px] lg:text-[20px] xl:text-[20px] ${active ? "border-b-2 border-[#7B2CBF] text-[#7B2CBF]" : ""
//         }`}
//       style={{ padding: "15px" }}
//       href={""}
//     >
//       {itemName}
//     </Link>
//   );
// };

const SettingsProfile = () => {


  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [users] = useState("teachers");

  const [formValues, setFormValues] = useState({
    // Corrected state variable name from "form" to "formValues"
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (imageFile) {
       URL.createObjectURL(imageFile);
      if (imageFile.size > 1024 * 1024) {
        // 1MB limit
        setErrors((prevErrors) => ({
          ...prevErrors,
          picture: "Image size is too large",
        }));
        setPreviewURL("");
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setFormValues({ ...formValues, picture: imageUrl });
        setPreviewURL(imageUrl);
        setErrors((prevErrors) => ({ ...prevErrors, picture: "" }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement | HTMLTextAreaElement> = async (event) => {
    event.preventDefault();
    // Check if image file exceeds 1MB
    if (errors.picture) {
      return;
    }
    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      setErrors({});
      console.log("user data", formValues);
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

  //form teacher
  const priceDropdown = [
    { id: 0, itemName: "select your pricing" },
    { id: 1, itemName: "$10 - $20" },
    { id: 2, itemName: "$20 - $30" },
    { id: 3, itemName: "$30 - $40" },
    { id: 4, itemName: "$40 - $50" },
    { id: 5, itemName: "$50 - $60" },
  ];

  const TimeDropdown = [
    { id: 0, itemName: "select your time available" },
    { id: 1, itemName: "7:00 - 8:00" },
    { id: 2, itemName: "8:00 - 9:00" },
    { id: 3, itemName: "9:00 - 10:00" },
    { id: 4, itemName: "10:00 - 11:00" },
    { id: 5, itemName: "11:00 - 12:00" },
  ];
  const [formteacher, setFormTeacher] = useState({
    bio: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Address: "",
    PhoneNumber: "",
    pictureTeacher: "",
    selectedPrice: priceDropdown[0].itemName,
    selectedTime: TimeDropdown[0].itemName,
  });
  const handleChangeFormTeacher = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormTeacher({ ...formteacher, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const handleChangeProfileTeacher = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (imageFile) {
       URL.createObjectURL(imageFile);
      if (imageFile.size > 1024 * 1024) {
        // 1MB limit
        setErrors((prevErrors) => ({
          ...prevErrors,
          pictureTeacher: "Image size is too large",
        }));
        setPreviewURL("");
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setFormTeacher({ ...formteacher, pictureTeacher: imageUrl });
        setPreviewURL(imageUrl);
        setErrors((prevErrors) => ({ ...prevErrors, pictureTeacher: "" }));
      }
    }
  };

  // Event handlers for select changes

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormTeacher((prevFormteacher) => ({
      ...prevFormteacher,
      selectedPrice: value,
    }));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormTeacher((prevFormteacher) => ({
      ...prevFormteacher,
      selectedTime: value,
    }));
  };
  const handleSubmitFormTeacher: React.FormEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    if (errors.pictureTeacher) {
      return;
    }
    try {
      await validationTeacher.validate(formteacher, { abortEarly: false });
      setErrors({});
      console.log("Submit : ", formteacher);
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
  return (
    <>
      {users == "user" && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="w-[100%] sm:w-full md:w-[90%] lg:w-[100%] xl:w-[80%] h-150 mx-auto flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
              <div className="flex flex-col h-[600px] gap-y-3 items-center md:items-center bg-[#F8F8F8]  lg:w-[35%] xl:w-[40%] w-full md:w-full rounded-md">
                <Typography fontSize="lg" variant="bold" className="mt-4">
                  Ny Sreyneang
                </Typography>
                <div className="flex mt-3 w-[160px] h-[160px] items-center justify-end rounded-full overflow-hidden">
                  {!previewURL ? (
                    <Image
                      className="object-cover w-full h-full"
                      src="/Profiles/example1.jpg"
                      alt="Bordered avatar"
                      width={160}
                      height={160}
                    />
                  ) : (
                    previewURL && (
                      <Image
                        src={previewURL}
                        alt="Preview"
                        className=" w-[160px] h-[160px] flex justify-start"
                      />
                    )
                  )}
                </div>
                <label className="bg-[#007C00] text-white w-[100%] h-[45px] sm:w-[90%] sm:h-[45px] md:w-[55%] md:h-[45px] lg:w-[85%] lg:h-[35px] mt-5 rounded-md xl:w-[80%] xl:h-[40px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="picture"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputFileRef}
                  />
                  Upload new photo
                </label>
                {errors.picture && (
                  <div className="flex justify-start">
                    <small className="mt-2" style={{ color: "red" }}>
                      {errors.picture}
                    </small>
                  </div>
                )}
              </div>
              <div className="flex flex-col   w-[100%] md:w-[100%] rounded-md    sm:ml-0 md:ml-0 lg:ml-10 xl:ml-10">
                <div className="flex flex-col mt-5 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      First Name
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="text"
                      borderRadius="md"
                      placeholder="First Name"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <>
                        <p className="text-red-500">{errors.firstName}</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Last Name
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="Last Name"
                      placeholder="Last Name"
                      borderRadius="md"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <>
                        <p className="text-red-500">{errors.lastName}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Email
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="email"
                      borderRadius="md"
                      placeholder="Email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <>
                        <p className=" text-red-500">{errors.email}</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Password
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="password"
                      placeholder="Password"
                      borderRadius="md"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <>
                        <p className="text-red-500">{errors.password}</p>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  fontSize="md"
                  className="w-full mt-8 mb-10 h-[45px] sm:w-[120px] sm:h-[45px] md:w-[150px] md:h-[45px] lg:w-[150px] lg:h-[45px] rounded-md xl:w-[160px] xl:h-[45px]"
                  onClick={() => handleSubmit}
                >
                  Update Info
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
      {users == "teachers" && (
        <>
          <form onSubmit={handleSubmitFormTeacher}>
            <div className="w-[100%] sm:w-full md:w-[90%] lg:w-[100%] xl:w-[80%]  mx-auto flex flex-col  md:flex-col lg:flex-row xl:flex-row pl-4 pr-4">
              <div className="flex flex-col h-[400px] gap-y-3 items-center md:items-center bg-[#f8f8f8] lg:w-[35%] xl:w-[40%] w-full md:w-full rounded-md ">
                <Typography fontSize="lg" variant="bold" className="mt-4">
                  Ny Sreyneang
                </Typography>
                <div className="flex mt-3 w-[160px] h-[160px] items-center justify-end rounded-full overflow-hidden">
                  {!previewURL ? (
                    <Image
                      className="object-cover w-full h-full"
                      src="/Profiles/example1.jpg"
                      alt="Bordered avatar"
                      width={160}
                      height={160}
                    />
                  ) : (
                    previewURL && (
                      <Image
                        src={previewURL}
                        alt="Preview"
                        className=" w-[160px] h-[160px] flex justify-start"
                      />
                    )
                  )}
                </div>
                <label className="bg-[#007C00] pl-4 pr-4 text-white w-[90%] h-[45px] sm:w-[90%] sm:h-[45px] md:w-[55%] md:h-[45px] lg:w-[85%] lg:h-[35px] mt-5 rounded-md xl:w-[80%] xl:h-[40px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="pictureTeacher"
                    accept="image/*"
                    onChange={handleChangeProfileTeacher}
                    ref={inputFileRef}
                  />
                  Upload new photo
                </label>
                {errors.pictureTeacher && (
                  <div className="flex justify-start">
                    <small className="mt-2" style={{ color: "red" }}>
                      {errors.pictureTeacher}
                    </small>
                  </div>
                )}
              </div>
              <div className="flex flex-col   w-[100%] md:w-[100%] rounded-md    sm:ml-0 md:ml-0 lg:ml-10 xl:ml-10">
                <div className="flex flex-col mt-5 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[100%] lg:w-[100%] mt-3 xl:w-[100%]">
                    <Typography align="center" fontSize="md" className="mb-2">
                      Edit Your Bio
                    </Typography>
                    <textarea
                      className="h-32 border p-2 outline-none focus:outline-[#7B2CBF] rounded-md"
                      placeholder="Bio..."
                      value={formteacher.bio}
                      name="bio"
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.bio && (
                      <>
                        <p className="text-red-500">{errors.bio}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-5 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      First Name
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="Firt Name"
                      borderRadius="md"
                      placeholder="First Name"
                      name="Firstname"
                      value={formteacher.Firstname}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.Firstname && (
                      <p className="text-red-500">{errors.Firstname}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Last Name
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="Last Name"
                      placeholder="Last Name"
                      borderRadius="md"
                      name="Lastname"
                      value={formteacher.Lastname}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.Lastname && (
                      <p className="text-red-500">{errors.Lastname}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Email
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="email"
                      borderRadius="md"
                      placeholder="Email"
                      name="Email"
                      value={formteacher.Email}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.Email && (
                      <p className="text-red-500">{errors.Email}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Password
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="password"
                      placeholder="Password"
                      borderRadius="md"
                      name="Password"
                      value={formteacher.Password}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.Password && (
                      <p className="text-red-500">{errors.Password}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Province
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="address"
                      borderRadius="md"
                      placeholder="Province"
                      name="Address"
                      value={formteacher.Address}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.Address && (
                      <p className="text-red-500">{errors.Address}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Phone Number
                    </Typography>
                    <InputForm
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      type="Tel"
                      placeholder="Phone Number"
                      borderRadius="md"
                      name="PhoneNumber"
                      value={formteacher.PhoneNumber}
                      onChange={handleChangeFormTeacher}
                    />
                    {errors.PhoneNumber && (
                      <p className="text-red-500">{errors.PhoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between">
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Time Available
                    </Typography>
                    <Select
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      borderRadius="md"
                      value={formteacher.selectedTime}
                      onChange={handleTimeChange}

                    >
                      {TimeDropdown.map((item) => (
                        <option
                          key={item.id}
                          value={item.itemName}
                          disabled={item.id == 0}
                        >
                          {item.itemName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col md:w-[45%] lg:w-[45%] mt-3 xl:w-[45%]">
                    <Typography align="left" fontSize="md">
                      Pricing
                    </Typography>
                    <Select
                      className="h-[50px] w-full border-gray-400 mt-2 focus:outline-[#7B2CBF]"
                      borderRadius="md"
                      value={formteacher.selectedPrice}
                      onChange={handlePriceChange}
                    >
                      {priceDropdown.map((item) => (
                        <option
                          key={item.id}
                          value={item.itemName}
                          disabled={item.id === 0}
                        >
                          {item.itemName}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <Button
                  fontSize="md"
                  className="w-full mt-8 mb-10 h-[45px] sm:w-[120px] sm:h-[45px] md:w-[150px] md:h-[45px] lg:w-[150px] lg:h-[45px] rounded-md xl:w-[160px] xl:h-[45px]"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SettingsProfile;
