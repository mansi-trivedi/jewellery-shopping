import serverResponse from "@/app/utils/nextServerResponse";

export async function POST() {
  try {
    const nextResponse = serverResponse({
      success: true,
      message: "Logout successful",
    });
    nextResponse.cookies.set("authToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    return nextResponse;
  } catch (error) {
    return serverResponse({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : undefined,
      status: 500,
    });
  }
}
