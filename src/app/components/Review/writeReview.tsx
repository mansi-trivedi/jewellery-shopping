"use client";

import React, { FormEvent, useCallback, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { useGlobalContext } from "context/GlobalContext";
import CustomModal from "components/Modal/Modal";
import Rating from "../Rating/Ratings";
import Button from "../ui/Button/Button";
import toast from "react-hot-toast";
import { addProductReview } from "@/app/data/review";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type WriteReviewProps = {
    reviewModal: boolean;
    handleReviewModal: () => void;
    sku: string
};

type ReviewErrorProps = {
    rating?: string;
    review?: string;
};

const WriteReview: React.FC<WriteReviewProps> = ({ reviewModal, handleReviewModal, sku }) => {

    const formRef = useRef<HTMLFormElement>(null);
    const [rating, setRating] = useState<number>(0);
    const [errors, setErrors] = useState<ReviewErrorProps>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = useCallback((review: string, rating: number) => {
        const formErrors: ReviewErrorProps = {};
        if (!review) {
            formErrors.review = "review is required.";
        }
        if (!rating) {
            formErrors.rating = "rating is required";
        }
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) {
            return false;
        }
        return true;
    }, []);


    const handleOnFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef?.current) {
            const formData = new FormData(formRef.current);
            const review = formData.get("review") as string;
            const isFormValid = validateForm(review, rating);
            if (!isFormValid) {
                toast.error("Please check form fields and try again");
                setIsLoading(false);
                return;
            }
            const [response, err] = await addProductReview(sku, review, rating, null);
            if (err) {
                console.log(err);
                setIsLoading(false);
                toast.error(
                    err.response
                        ? err.response.data?.error
                        : "Review not Added. Please try again later"
                );
                return;
            }
            setIsLoading(false);
            if (response?.success) {
                toast.success("Review Added", {
                    duration: 1000,
                });
                handleReviewModal();
            }
        }
    }

    return (
        <CustomModal isOpen={reviewModal} contentLabel="WriteReview">
            <div className="relative">
                <div className="flex justify-between">
                    <p className="text text-lg font-semibold text-darkBlue">Write a Review</p>
                    <button onClick={handleReviewModal}>
                        <RxCross2 size={20} className="text-darkBlue" />
                    </button>
                </div>
                <hr className="border border-gray-300 my-w" />
                <div className="pt-5">
                    <form ref={formRef} onSubmit={handleOnFormSubmit} className="space-y-2">

                        <label className="block text-sm font-semibold text-gray-700">
                            Select Rating:
                        </label>
                        <Rating isEditable={true} rating={rating} setRating={setRating} />
                        {errors.rating && (
                            <p className="text-red-500 text-sm">{errors.rating}</p>
                        )}

                        <label htmlFor="review" className="block text-sm font-semibold text-gray-700 pt-2">
                            Write your Review:
                        </label>
                        <textarea
                            id="review"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkGreen hover:ring-2 hover:ring-darkGreen text-sm"
                            rows={4}
                            placeholder="Share your experience..."
                            name="review"
                            required
                        ></textarea>
                        {errors.review && (
                            <p className="text-red-500 text-sm">{errors.review}</p>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Submit Review
                        </Button>
                    </form>
                    <LoadingSpinner isLoading={isLoading} />
                </div>
            </div>
        </CustomModal>
    );
};

export default WriteReview;
