import { APIResponse } from "./api";
import { ServerResponseType } from "./global";

type Order = {
  orderId: string;
  totalPrice: string;
  dateCreated: string;
  dateModified: string;
  paymentStatus: string;
};

type OrderItem = {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: string;
  price: string;
  productName: string;
  productImages: string;
  productDescription: string;
  dateCreated: string;
  dateModified: string;
};

type GetOrderAndOrderItemDetailsResponse = APIResponse<{
  orderDetails: Order;
  orderItems: Array<OrderItem>;
}>;

type GetServerSidePropsTypes = ServerResponseType<{
  orderDetails: Order;
  orderItems: Array<OrderItem>;
}>;

type OrderAPIProps = {
  getOrderAndOrderItemDetailsResponse: GetOrderAndOrderItemDetailsResponse;
  serverSideProps: GetServerSidePropsTypes;
};

export type { Order, OrderItem, OrderAPIProps };
