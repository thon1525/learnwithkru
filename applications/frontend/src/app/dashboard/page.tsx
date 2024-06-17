"use client";
import { Dashboard } from "@/components/templates/Dashboard";

const Page = () => {

  return (
    <div className="max-w-full grid">
      <div className="w-full flex justify-center items-center"></div>
      <Dashboard />
      <div className="w-full flex justify-center items-start bg-gray-900"></div>
    </div>
  );
};

export default Page;
