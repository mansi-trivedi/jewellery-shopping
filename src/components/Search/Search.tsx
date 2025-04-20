import { useRouter } from "next/router";
import React, { useCallback, FormEvent } from "react";
import toast from "react-hot-toast";
import { ImSearch } from "react-icons/im";

const Search = () => {
  const router = useRouter();

  const handleOnSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const searchQuery = formData.get("search-query") as string;
      if (!searchQuery.trim()) {
        toast.error("Please add search term to search");
        return;
      }
      router.push({
        pathname: "/search",
        query: { search_term: searchQuery },
      });
    },
    [router]
  );

  return (
    <div className="w-full border rounded flex justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <form onSubmit={handleOnSubmit} className="flex w-full">
          <input
            type="text"
            placeholder="Search..."
            name="search-query"
            className="w-full h-full bg-badgeShade px-2 min-h-8 border-none border-r-0 font-quickSand"
          />
          <button type="submit" className="bg-darkGreen p-2">
            <ImSearch color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
