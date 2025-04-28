import { jwtVerify } from "jose";

async function getUserFromToken(token: string) {
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN)
    );
    return payload;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export { getUserFromToken };
