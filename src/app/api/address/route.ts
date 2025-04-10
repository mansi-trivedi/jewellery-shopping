import { AddressPropsType } from "@/app/components/Address/AddressDetails";
import { executeQuery } from "@/app/libs/mysql";
import { decodeAndGetUserInfo } from "@/app/utils/getAuthToken";
import serverResponse from "@/app/utils/nextServerResponse";

export const revalidate = 0;

export async function GET() {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  try {
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    const [rows] = await executeQuery("call GetAddressByUser(?)", [
      payload?.userId,
    ]);
    const addresses = rows;
    return serverResponse({
      success: true,
      data: addresses,
    });
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await decodeAndGetUserInfo()) ?? {};
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    const requestBody = await request.json();
    const [rows] = await executeQuery(
      "call AddAddress(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        requestBody.addressline,
        requestBody.area,
        requestBody.landmark,
        requestBody.city,
        requestBody.state,
        requestBody.country,
        requestBody.postalcode,
        requestBody.phone,
        requestBody.name,
        payload?.userId,
      ]
    );
    const addresses = rows as Array<AddressPropsType>;
    return serverResponse({
      success: true,
      message: "Address Added Successfully",
      data: addresses,
    });
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const payload = (await decodeAndGetUserInfo()) ?? {};
  const { searchParams } = new URL(request.url);
  const addressId = searchParams.get("address_id");
  try {
    if (!payload?.userId) {
      return serverResponse({
        success: false,
        message: "unauthorized request",
        status: 401,
      });
    }
    await executeQuery("call DeleteAddress(?)", [addressId]);
    return serverResponse({
      success: true,
      message: "Address removed successfully from your list",
    });
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
