import React, { FC } from "react";
import Link from "next/link";

import { useReviewContext } from "@/app/contexts/ReviewContext";
import ReviewList from "./ReviewList";

type ReviewPropTypes = {
  isReviewPage: boolean;
  sku: string;
};

const ReviewLayout: FC<ReviewPropTypes> = (props) => {
  const { sku, isReviewPage } = props;
  const { handleReviewModal, productReviews } = useReviewContext();
  const reviews = isReviewPage ? productReviews : productReviews.slice(0, 5);

  return (
    <div className="relative pb-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-darkBlue mb-4">
          Customer Reviews
        </h2>
      </div>
      <div>
        <button
          type="button"
          className="bg-darkGreen text-white py-2 px-4 rounded-md"
          onClick={handleReviewModal}
        >
          Write a Review
        </button>
        <ReviewList reviews={reviews} />
        {reviews?.length && !isReviewPage ? (
          <Link href={`/product/${sku}/review`}>
            <p className="font-semibold underline">See All reviews</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewLayout;
