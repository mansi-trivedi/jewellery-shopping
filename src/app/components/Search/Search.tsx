import { useRouter } from "next/router";
import React, { useCallback, useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { ImSearch } from "react-icons/im";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleOnInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleOnSearchBtnClick = useCallback(() => {
    if (!searchQuery.trim()) {
      toast.error("Please add search term to search");
      return;
    }
    router.push({
      pathname: "/search",
      query: { search_term: searchQuery },
    });
  }, [searchQuery, router]);

  return (
    <div className="w-full border rounded flex justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full bg-badgeShade px-2 min-h-8 border-none border-r-0 font-quickSand"
          value={searchQuery}
          onChange={handleOnInputChange}
        />
        <button className="bg-darkGreen p-2" onClick={handleOnSearchBtnClick}>
          <ImSearch color="white" />
        </button>
      </div>
    </div>
  );
};

export default Search;
