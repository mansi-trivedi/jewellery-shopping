import Review from "@/app/components/Review/Review";
import { useParams } from "next/navigation";
import React, { FC } from "react";

const ReviewPage: FC = () => {
    const params = useParams<{ sku: string }>();
    return <Review isReviewPage={true} sku={params?.sku ?? ""} />;
};

export default ReviewPage;