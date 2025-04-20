import React from "react";
import CustomModal from "../Modal/Modal";
import { useReviewContext } from "@/app/contexts/ReviewContext";
import ReviewForm from "./ReviewForm";

const ReviewModal = () => {
  const { reviewModal } = useReviewContext();
  return (
    <CustomModal isOpen={reviewModal} contentLabel="WriteReview">
      <ReviewForm />
    </CustomModal>
  );
};

export default ReviewModal;
