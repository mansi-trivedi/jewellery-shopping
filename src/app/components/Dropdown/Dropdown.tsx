import React, { useEffect, useRef } from "react";

type DropdownProps = {
  selected: string;
  handleSelect: (option: OptionValue) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type OptionValue = {
  label: string;
  value: string;
};
const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  selected,
  setIsOpen,
  handleSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: OptionValue[] = [
    {
      label: "Price High To Low",
      value: "price_high_to_low",
    },
    {
      label: "Price Low To High",
      value: "price_low_to_high",
    },
    {
      label: "Discount High To Low",
      value: "discount_high_to_low",
    },
    {
      label: "Discount Low To High",
      value: "discount_low_to_high",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" py-1 px-1 ml-1 text-sm font-medium text-darkBlue bg-offWhite border border-gray-300 rounded shadow-sm hover:bg-gray focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selected}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="z-10 absolute left-0 mt-2 bg-white border border-gray rounded shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-sm text-darkBlue cursor-pointer hover:bg-orange"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
