import { getUserOrders } from "@/app/data/order";
import { getUserFromToken } from "@/app/libs/auth";
import { parseCookies } from "@/app/utils/cookie";
import { fetchProductImages } from "@/app/utils/imageUtils";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import React, { FC } from "react";
import { OrderAPIProps } from "types/order";
import Image from "next/image";

const OrderPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data, success } = props;
  const { orderDetails, orderItems } = data ?? {};

  if (!success || !orderItems?.length) {
    return (
      <h1 className="text-lg text-darkBlue text-center py-4 font-semiboldS">
        No Orders Found
      </h1>
    );
  }

  return (
    <>
      <div className="flex content-center justify-between">
        <h1 className="text-xl font-bold text-darkBlue mt-4">Orders</h1>
      </div>
      <div className="grid lg:grid-cols-[calc(70%-1rem)_calc(30%-1rem)] py-4 lg:py-8 relative min-h-screen w-full max-w-full gap-8">
        <div className="order-items-container flex flex-col gap-5">
          {orderItems?.map((orderItem, index) => {
            const productImages = fetchProductImages(orderItem.productImages);
            return (
              <div className="px-2 bg-cloudGray relative p-2" key={index}>
                <div className="grid lg:grid-cols-[40%_55%] xl:grid-cols-[40%_55%] 2xl:grid-cols-[40%_55%] 3xl:grid-cols-[40%_55%]p-2 items-center">
                  <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row">
                    <div className="w-20 h-20 relative m-2">
                      {productImages?.[0] && (
                        <Image
                          src={productImages[0]}
                          className="rounded-lg"
                          alt="Product Image"
                          layout="fill"
                          objectFit="cover"
                        />
                      )}
                    </div>
                    <div className="product-information px-2 my-2">
                      <p className="font-semibold text-darkBlue">
                        {orderItem.productName}
                      </p>
                      <p className="mx-0 mt-1 mb-0 text-sm text-darkBlue">
                        {orderItem.productDescription}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[35%_32%_35%] py-2">
                    <div className=" pl-2 ">
                      <p className="font-semibold text-darkBlue">
                        Rs. {Number(orderItem.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-summary-container sticky top-8 self-start w-full">
          <div className="relative py-2">
            <table className="w-full border-collapse border border-gray-200 bg-cloudGray">
              <tbody>
                <tr>
                  <td className="py-2 px-4 text-lg font-semibold">
                    Order Price:
                  </td>
                  <td className="py-2 px-4 text-lg font-semibold text-darkBlue text-right">
                    Rs. {orderDetails?.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx?.req?.headers.cookie || "");
  const user = await getUserFromToken(cookies["authToken"]);
  const [response] = await getUserOrders((user?.userId ?? "") as string);

  return {
    props: {
      success: response?.success ?? false,
      data: response?.data ?? null,
    },
  };
}) satisfies GetServerSideProps<
  OrderAPIProps["getOrderAndOrderItemDetailsResponse"]
>;

export default OrderPage;
