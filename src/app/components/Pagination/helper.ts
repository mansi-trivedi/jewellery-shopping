export type GeneratePageType = {
  siblingCount?: number;
  currentPage: number;
  totalPages: number;
};

export const ELLIPSIS = "...";

type GeneratePageFn = Array<number | string> | undefined;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const generatePages = ({
  siblingCount = 1,
  currentPage,
  totalPages,
}: GeneratePageType): GeneratePageFn => {
  const totalPageNumbers = siblingCount + 4; //5
  const newIndex = currentPage + 1;
  /*
      Case 1:
      If the number of pages is less than and equal to the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  // Calculate left and right sibling index
  const leftSiblingIndex = Math.max(newIndex - siblingCount, 1);
  const rightSiblingIndex = Math.min(newIndex + siblingCount, totalPages);
  /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits
    */
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  /*
      Case 2: No left dots to show, but rights dots to be shown
    */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 2 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    //To hide one element from the array for UI
    if (leftItemCount - 1 - newIndex !== 0) {
      leftRange.pop();
    }
    return [...leftRange, ELLIPSIS, totalPages];
  }

  /*
      Case 3: No right dots to show, but left dots to be shown
    */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 2 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    //To hide one element from the array for UI
    if (totalPages - newIndex !== 2) {
      rightRange.shift();
    }
    return [firstPageIndex, ELLIPSIS, ...rightRange];
  }

  /*
      Case 4: Both left and right dots to be shown
    */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, ELLIPSIS, ...middleRange, ELLIPSIS, lastPageIndex];
  }
};
