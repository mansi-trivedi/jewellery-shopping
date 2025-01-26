import { useState, useEffect, useRef } from "react";

const Dropdown = () => {
  const [selected, setSelected] = useState<string>("Select an option");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: string[] = [
    "Best Selling",
    "Price High To Low",
    "Price Low To High",
    "Discount",
  ];

  const handleSelect = (option: string): void => {
    setSelected(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
