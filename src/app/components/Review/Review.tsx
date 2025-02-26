"use client";
import React from "react";
import Rating from "components/Rating/Ratings";
import Sort from "components/Sort/Sort";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const customersReviews = [
  {
    user: "Mansi Trivedi",
    review:
      "✨ Beautiful & Elegant! ✨ These earrings are lightweight, stylish, and well-crafted—perfect for any occasion! They sparkle beautifully, feel comfortable, and have received many compliments. A must-have for any jewelry lover! 💖",
    date: "January 29, 2025",
    rating: 4,
  },
  {
    user: "Mansi Trivedi",
    review:
      "✨ Gorgeous & Elegant Necklace! ✨ This necklace is stunning, with a delicate design that adds the perfect touch of elegance! It's lightweight, well-crafted, and sparkles beautifully—great for any occasion. A true must-have for jewelry lovers! 💖",
    date: "January 29, 2025",
    rating: 3,
  },
];

interface ReviewProps {
  isReviewPage: boolean;
}

const Review: React.FC<ReviewProps> = ({ isReviewPage }) => {
  const router = useRouter();
  return (
    <div className="my-2 mx-4">
      {isReviewPage && (
        <>
          <div className="w-full my-2 flex justify-end">
            <RxCross2
              size={20}
              className="cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <hr className="border border-gray-300 my-1" />
        </>
      )}
      <div className="flex justify-between mx-2">
        <h2 className="text-lg font-bold text-darkBlue my-2">
          Customer Review
        </h2>
        {isReviewPage && <Sort />}
      </div>
      <div>
        <button
          type="button"
          className="bg-lightBlue text-white py-2 px-4 rounded-md m-2"
        >
          Write a Review
        </button>
        <ul className="my-2">
          {customersReviews.map((review, key) => {
            return (
              <li
                key={key}
                className="py-5 text-left border border-gray-300 px-4 m-2 rounded-lg bg-offWhite"
              >
                <div className="flex items-start">
                  <div className="bg-darkBlue p-3 text-white font-semibold rounded-full">
                    MT
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center">
                      <Rating isEditable={false} rating={review.rating} />
                    </div>
                    <p className="mt-5 text-base text-gray-900">
                      {review.review}
                    </p>
                    <p className="mt-5 text-sm font-bold text-gray-900">
                      {review.user}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Review;
