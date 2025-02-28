import React, { useCallback } from "react";

import { generatePages, ELLIPSIS } from "./helper";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export type PaginationProps = {
  onPageClick: (pageNumber: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentPage, itemsPerPage, totalItems, onPageClick } = props;

  // if page index start from 0 add 1
  const startIndex = 1;

  const handlePageCount = useCallback(
    (pageNumber: number) => () => {
      if (pageNumber === currentPage) {
        return;
      }
      onPageClick(pageNumber);
    },
    [currentPage, onPageClick]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 0;

  const pageData = generatePages({
    currentPage,
    totalPages,
  });

  const paginationRangeLength = pageData?.length ?? 0;
  const lastPage =
    (pageData?.[paginationRangeLength - 1] as number) - startIndex;
  const isLastPage = currentPage === lastPage;

  // const pageButtonLabel = useMemo(() => "", []);

  if (!itemsPerPage || !totalItems) {
    return null;
  }

  return (
    <div className="relative flex justify-between flex-col overflow-auto my-4 items-center 2xl:flex-row 2xl:my-8 2xl:justify-center font-quickSand font-semibold">
      <ul className="flex list-none mt-4 p-0 2xl:m-0 items-center px-2">
        {/*  Left Navigation arrow */}
        <li className="min-w-8 flex items-center justify-center">
          <button
            data-testid="Pagination_PreviousPageButton"
            aria-label={"previous page label"}
            onClick={handlePageCount(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <SlArrowLeft className={`w-4 h-4 fill-darkBlue`} />
          </button>
        </li>

        {/* render page count and ellipsis */}
        {pageData?.map((pageNumber, index) => {
          if (pageNumber.toString() === ELLIPSIS) {
            return (
              <li
                key={`${pageNumber}_${index}`}
                className="min-w-8 flex items-center justify-center"
              >
                &#8230;
              </li>
            );
          }

          const isSelected =
            currentPage === (pageNumber as number) - startIndex;

          return (
            <li
              key={`${pageNumber}_${index}`}
              className="text-center min-w-8 flex items-center justify-center"
            >
              <button
                aria-pressed={isSelected}
                onClick={handlePageCount((pageNumber as number) - startIndex)}
                aria-label={"page button label"}
                style={{ borderRadius: "4px" }}
                className="w-full h-full p-2 hover:bg-darkBlue hover:text-white"
              >
                <span className="text-fluid-micro-guided leading-fluid-micro-guided">
                  {pageNumber}
                </span>
              </button>
            </li>
          );
        })}

        {/*  Right Navigation arrow */}
        <li className="min-w-8 flex items-center justify-center">
          <button
            data-testid="Pagination_NextPageButton"
            aria-label={"next page label"}
            onClick={handlePageCount(currentPage + 1)}
            disabled={isLastPage}
          >
            <SlArrowRight className={`w-4 h-4 fill-darkBlue`} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
