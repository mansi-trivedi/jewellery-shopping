import { useReviewContext } from "@/app/contexts/ReviewContext";
import React, { FC } from "react";
import { ProductReviewType } from "types/review";
import Rating from "../Rating/Ratings";

type ReviewListPropTypes = {
  reviews: ProductReviewType[];
};

const ReviewList: FC<ReviewListPropTypes> = (props) => {
  const { reviews } = props;
  const { getInitials, formatDate } = useReviewContext();

  if (!reviews?.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-4 my-3">
      {reviews.map((review, key) => {
        return (
          <li
            key={key}
            className="py-5 text-left border border-gray-300 px-4 rounded-lg bg-offWhite"
          >
            <div className="flex items-start">
              <div className="bg-darkGreen p-3 text-white font-semibold rounded-full">
                {getInitials(review.username ?? "Unknown User")}
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  <Rating isEditable={false} rating={review.rating} />
                </div>
                <p className="mt-2 text-fluid-micro-guided leading-fluid-micro-guided text-blackShade font-medium">
                  {review.review}
                </p>
                <p className="mt-3 text-fluid-base leading-fluid-base font-bold text-blackShade">
                  {review.username ?? "Unknown User"}
                </p>
                <p className="mt-1 text-fluid-base leading-fluid-base text-blackShade">
                  {formatDate(review.dateCreated)}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
