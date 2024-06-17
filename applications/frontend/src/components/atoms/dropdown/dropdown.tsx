"use client";
import React, { useEffect, useRef, useState, ReactElement } from "react";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  buttonContent: React.ReactNode;
  selectedItem: string;
  onSelect: (item: string) => void;
}

interface ShowDropProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
  align?: string;
}

interface LinkDropdownProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
}

interface LinkDropdownPageProps {
  itemDropdown: string;
  className?: string;
  role?: string;
  onSelect?: (item: string) => void;
  closeDropdown?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  buttonContent,
  selectedItem,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`dropdown relative inline-block ${className || ""}`}
      ref={dropdownRef}
    >
      <button
        className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xs font-normal shadow-sm border hover:bg-gray-50"
        id="menu-button"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        {selectedItem ? selectedItem : buttonContent}
        <svg
          className={`-mr-1 h-5 w-5 text-gray-400 transition-all duration-300 transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ShowDropdown className={className}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child,{
                onSelect: (item: string) => {
                  onSelect(item);
                
                },
                
              } as unknown as ReactElement);
            }
            return child;
          })}
        </ShowDropdown>
      )}
    </div>
  );
};

const ShowDropdown: React.FC<ShowDropProps> = ({
  children,
  className,
  role = "menu",
  align = "right-0",
}) => {

  return (
    <div
      className={`absolute ${align} z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      role={role}
    >

      {children}

    </div>
  );
};

const LinkDropdown: React.FC<LinkDropdownProps> = ({
  children,
  className,
  role = "menuitem",
}) => {
  return (
    <div
      className={`hover:bg-gray-50 hover:rounded-md ${className}`}
      role={role}
    >
      {children}
    </div>
  );
};

const LinkDropdownPage: React.FC<LinkDropdownPageProps> = ({
  itemDropdown,
  className,
  onSelect,
  role = "menuitem",
  closeDropdown,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Stop event propagation
    if (onSelect) {
      onSelect(itemDropdown);
    }
    if (closeDropdown) {
      closeDropdown(); // Close the dropdown after item is selected
    }
  };

  return (
    <div className={className} role={role} onClick={handleClick}>
      {itemDropdown}
    </div>
  );
};

export { Dropdown, ShowDropdown, LinkDropdown, LinkDropdownPage };
