import React, { FC } from "react";
import { ReviewProvider } from "@/app/contexts/ReviewContext";
import ReviewLayout from "./ReviewLayout";
import ReviewModal from "./ReviewModal";

type ReviewPropTypes = {
  sku: string;
  isReviewPage: boolean;
};

const Review: FC<ReviewPropTypes> = (props) => {
  const { sku, isReviewPage } = props;

  return (
    <ReviewProvider sku={sku}>
      <ReviewLayout sku={sku} isReviewPage={isReviewPage} />
      <ReviewModal />
    </ReviewProvider>
  );
};

export default Review;
