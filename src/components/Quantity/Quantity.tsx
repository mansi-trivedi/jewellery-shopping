import React from "react";

const Quantity = () => {
  return (
    <div className="mx-auto flex h-8 items-stretch text-darkBlue">
      <div className="input-group relative flex">
        <input
          type="button"
          value="-"
          className="button-minus bg-darkGreen min-w-9 w-auto transition-all duration-200 ease-in text-white cursor-pointer "
          data-field="quantity"
        />
        <input
          type="number"
          step="1"
          max=""
          value="1"
          name="quantity"
          className="quantity-field text-center"
        />
        <input
          type="button"
          value="+"
          className="button-plus bg-darkGreen min-w-9 w-auto transition-all duration-200 ease-in text-white cursor-pointer"
          data-field="quantity"
        />
      </div>
    </div>
  );
};

export default Quantity;
