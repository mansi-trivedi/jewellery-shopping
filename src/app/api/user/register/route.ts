import { hashPassword } from "@/app/api/services/hashPassword";
import { executeQuery } from "@/app/libs/mysql";
import serverResponse from "@/app/utils/nextServerResponse";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const userPassword = await hashPassword(res.password);
    const query = "call register(?, ?)";
    await executeQuery(query, [res.email, userPassword]);
    return serverResponse({
      success: true,
      message: "User Registered Successfully",
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
