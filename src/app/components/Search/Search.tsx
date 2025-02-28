import React from "react";
import { ImSearch } from "react-icons/im";

const Search = () => {
  return (
    <>
      <div className="w-full border rounded flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full bg-badgeShade px-2 min-h-8 border-none border-r-0 font-quickSand"
          />
          <button className="bg-darkGreen p-2">
            <ImSearch color="white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
