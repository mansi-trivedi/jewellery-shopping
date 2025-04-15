import client from "@/app/utils/paypal/index";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  /** If order id is not available */
  if (!req.orderID) {
    return NextResponse.json(
      {
        success: false,
        message: "Please provide order id",
      },
      {
        status: 400,
      }
    );
  }

  try {
    //Capture order to complete payment
    const orderID = req.orderID;
    const paypalClient = client();
    const capturedRequest = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await paypalClient.execute(capturedRequest);
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "Some Error Occured at backend",
        },
        {
          status: 500,
        }
      );
    }
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
}
