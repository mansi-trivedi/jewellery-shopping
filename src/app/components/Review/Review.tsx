"use client";
import React, { useEffect, useState } from "react";
import Rating from "components/Rating/Ratings";
import Link from "next/link";
import { ProductReviewType } from "types/review";
import { getProductReview } from "@/app/data/review";
import WriteReview from "./writeReview";


interface ReviewProps {
  isReviewPage: boolean;
  sku: string;
}

const Review: React.FC<ReviewProps> = ({ isReviewPage, sku }) => {
  const [productReview, setProductReview] = useState<ProductReviewType[]>([]);
  const [reviewModal, setReviewModal] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const [reviewResp, reviewErr] = await getProductReview(sku ?? "");
      if (reviewErr) {
        return;
      }
      if (reviewResp?.success) {
        setProductReview(
          reviewResp?.data && isReviewPage ? reviewResp.data : reviewResp?.data?.slice(0, 3) || []
        );
      }
    })();
  }, [isReviewPage, setProductReview, sku]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? words.map(word => word.charAt(0).toUpperCase()).join("")
      : name.charAt(0).toUpperCase();
  };

  const handleReviewModal = () => {
    setReviewModal(!reviewModal)
  }

  return (
    <div className="my-5">
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
        <WriteReview reviewModal={reviewModal} handleReviewModal={handleReviewModal} sku={sku} />
        <ul className="flex flex-col gap-4 my-3">
          {productReview.map((review, key) => {
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
                    <p className="mt-2 text-base text-blackShade">
                      {review.review}
                    </p>
                    <p className="mt-3 text-sm font-bold text-blackShade">
                      {review.username ?? "Unknown User"}
                    </p>
                    <p className="mt-1 text-sm text-blackShade">
                      {formatDate(review.dateCreated)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {!isReviewPage && <Link href={`/product/${sku}/review`}>
          <p className="font-semibold underline">See All reviews</p>
        </Link>}
      </div>
    </div>
  );
};

export default Review;
