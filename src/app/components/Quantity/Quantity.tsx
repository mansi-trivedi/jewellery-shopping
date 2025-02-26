import React from "react";

const Quantity = () => {
  return (
    <div className="mx-auto flex h-8 items-stretch text-darkBlue">
      <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-lightBlue hover:text-white">
        -
      </button>
      <p className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
        1
      </p>
      <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-lightBlue hover:text-white">
        +
      </button>
    </div>
  );
};

export default Quantity;
