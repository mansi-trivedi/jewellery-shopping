import React from "react";
import { ImSearch } from "react-icons/im";

function Search() {
  return (
    <>
      <div className=" w-full border rounded flex justify-center items-center bg-white">
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 w-full focus:outline-none focus:ring-0 rounded"
          />
        </div>
        <div className="bg-lightBlue w-12 p-2 rounded-tr rounded-br flex justify-center items-center">
          <ImSearch size={20} color="white" />
        </div>
      </div>
    </>
  );
}

export default Search;
