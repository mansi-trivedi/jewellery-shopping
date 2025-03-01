import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const getAuthToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("authToken");
  return cookie?.value ?? "";
};

async function decodeAndGetUserInfo() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return null;
    }
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN)
    );
    return payload; // Returns the payload if the token is valid.
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return null; // Returns null if the verification fails.
  }
}

export { getAuthToken, decodeAndGetUserInfo };
