"use client";
import React, { ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
  className?: ReactNode;
}
const Modal: React.FC<ModalProps>  = ({className}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle modal */}
      {/* <button onClick={toggleModal} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded focus:outline-none">Open Modal</button> */}
      z
      {/* Modal content */}
      {isOpen && (
        <div className={`fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50 ${className}`}>
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Modal Content</h2>
            <p>This is the content of the modal.</p>
            <button onClick={toggleModal} className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded focus:outline-none">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
