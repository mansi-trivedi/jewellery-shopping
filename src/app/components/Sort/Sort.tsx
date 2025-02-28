import React from "react";

type OptionValue = {
  label: string;
  value: string;
};

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

const Sort = () => {
  return (
    <div className="flex items-center">
      <span className="text-darkBlue">Sort By:</span>
      <select>
        <option selected>Select Option To Sort</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
