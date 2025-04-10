import {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { ProductReviewType } from "types/review";
import { addProductReview, getProductReview } from "../data/review";
import toast from "react-hot-toast";
import { useUserContext } from "./UserContext";
import { useRouter } from "next/router";

type ReviewProviderPropTypes = {
  children: ReactNode;
  sku: string;
};

type ReviewContextType = {
  productReviews: ProductReviewType[];
  reviewModal: boolean;
  getInitials: (name: string) => string;
  formatDate: (date: string) => string;
  handleReviewModal: () => void;
  updateProductReviews: (reviews: ProductReviewType[]) => void;
  createProductReview: (review: string, rating: number) => Promise<void>;
  getAndSetReviewsList: (productSku?: string) => Promise<void>;
};

const DEFAULT_VALUE: ReviewContextType = {
  productReviews: [],
  reviewModal: false,
  getInitials: () => "",
  formatDate: () => "",
  handleReviewModal: () => { },
  updateProductReviews: () => { },
  createProductReview: () => Promise.resolve(),
  getAndSetReviewsList: () => Promise.resolve(),
};

const ReviewContext = createContext(DEFAULT_VALUE);

const ReviewProvider: FC<ReviewProviderPropTypes> = (props) => {
  const { children, sku } = props;
  const [productReviews, setProductReviews] = useState<
    ReviewContextType["productReviews"]
  >([]);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  /** Handlers */

  const getInitials = useCallback((name: string): string => {
    const words = name.split(" ");
    return words.length > 1
      ? words.map((word) => word.charAt(0).toUpperCase()).join("")
      : name.charAt(0).toUpperCase();
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const handleReviewModal = useCallback(() => {
    if (isLoggedIn) {
      setReviewModal((prev) => !prev);
    }
    else {
      toast.error("Please log in to add a review.")
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const updateProductReviews = useCallback((reviews: ProductReviewType[]) => {
    setProductReviews(reviews);
  }, []);

  /** Adds new review for the product */
  const createProductReview = useCallback(
    async (review: string, rating: number) => {
      const [response, err] = await addProductReview(sku, review, rating, null);
      if (err) {
        const errorMessage = err.response
          ? err.response.data?.error
          : "Review not Added. Please try again later";
        toast.error(errorMessage);
        return;
      }
      if (response?.success) {
        toast.success("Review Added", {
          duration: 1000,
        });
      }
    },
    [sku]
  );

  /** Gets and Sets reviews */
  const getAndSetReviewsList = useCallback(
    async (productSku: string = "") => {
      const [reviewResp, reviewErr] = await getProductReview(productSku || sku);
      if (reviewErr) {
        return;
      }
      if (reviewResp?.success) {
        setProductReviews(reviewResp?.data ?? []);
      }
    },
    [sku]
  );

  /** Effects */

  useEffect(() => {
    (async () => {
      await getAndSetReviewsList();
    })();
  }, [getAndSetReviewsList]);

  /**
   * add your context values and handlers here
   */
  const providerValue: ReviewContextType = useMemo(
    () => ({
      productReviews,
      getInitials,
      formatDate,
      reviewModal,
      handleReviewModal,
      updateProductReviews,
      createProductReview,
      getAndSetReviewsList,
    }),
    [
      productReviews,
      getInitials,
      formatDate,
      reviewModal,
      handleReviewModal,
      updateProductReviews,
      createProductReview,
      getAndSetReviewsList,
    ] // update dependency as per requirement
  );

  return (
    <ReviewContext.Provider value={providerValue}>
      {children}
    </ReviewContext.Provider>
  );
};

// Context Hook
const useReviewContext = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviewContext must be used within ReviewProvider");
  }
  return context;
};

export { useReviewContext, ReviewProvider, ReviewContext };
export type { ReviewContextType };
