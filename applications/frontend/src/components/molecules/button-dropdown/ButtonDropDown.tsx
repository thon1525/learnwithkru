import { Fragment, useState, useEffect, useRef } from "react";


interface ButtonDropDownProps {
  options: { icon?: React.ReactNode; value?: string }[];
  onChange: (value?: string) => void;
  className?: string;
}

const ButtonDropDown: React.FC<ButtonDropDownProps> = ({
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]?.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value?: string) => {
    setSelectedOption(value);
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="flex justify-center w-full text-sm font-medium text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="flex items-center">
            {options.find((option) => option.value === selectedOption)?.icon}
          </span>
          <svg
            className={`-mr-1 ml-1 h-5 w-5 ${isOpen ? "transform rotate-180" : ""
              }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.41-1.42L10 9.58l3.29-3.29a1 1 0 111.42 1.42l-4 4a1 1 0 01-.71.29z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-18 border rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <Fragment key={index}>
                <button
                  onClick={() => handleOptionClick(option.value)}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-purple-200"
                  role="menuitem"
                >
                  <span className="flex items-center">
                    {option.icon}
                    <span className="ml-2">{option.value}</span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ButtonDropDown };
