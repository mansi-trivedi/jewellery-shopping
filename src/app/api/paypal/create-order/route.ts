import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import client from "@/app/utils/paypal/index";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const payload = (await decodeAndGetUserInfo()) ?? {};
  if (!req.order_price || !payload?.userId)
    return NextResponse.json(
      {
        success: false,
        message: "Please Provide order_price And User ID",
      },
      { status: 400 }
    );

  try {
    const paypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.order_price + "",
          },
        },
      ],
    });
    const response = await paypalClient.execute(request);
    if (response.statusCode !== 201) {
      return NextResponse.json(
        {
          success: false,
          message: "Some Error occurred at backend",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...response.result,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
