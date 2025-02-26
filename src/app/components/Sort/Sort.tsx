import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import Dropdown from "components/Dropdown/Dropdown";

type OptionValue = {
  label: string;
  value: string;
};

const Sort = () => {
  const [selected, setSelected] = useState<string>("Select an option");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: OptionValue): void => {
    console.log("optionss", option.value);
    setSelected(option.label);
    setIsOpen(false); // Close the dropdown after selection
  };
  return (
    <div className="flex items-center cursor-pointer">
      <BiSortAlt2 size={20} color="#001e38" />
      <span className="text-darkBlue">Sort By:</span>
      <Dropdown
        selected={selected}
        handleSelect={handleSelect}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default Sort;
