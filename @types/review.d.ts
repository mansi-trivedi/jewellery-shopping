import { APIResponse } from "./api";

type ProductReviewType = {
  reviewId: string;
  review: string;
  rating: number;
  images: string | null;
  username: string | null;
  dateCreated: string;
};

type AverageReviewType = {
  avgReview: number;
  totalReviews: number;
} | null;

type GetReviewResponse = APIResponse<Array<ProductReviewType>>;
type GetAverageReviewResponse = APIResponse<AverageReviewType>;

export type {
  ProductReviewType,
  GetReviewResponse,
  GetAverageReviewResponse,
  AverageReviewType,
};
