import pool from "@/app/libs/mysql";
import { response } from "@/app/api/utils/constants";
import { hashPassword } from "@/app/api/services/hashPassword";
import { RowDataPacket } from "mysql2/promise";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const db = await pool.getConnection();
    const userPassword = await hashPassword(res.password);
    const query = "call register(?, ?)";
    await db.query<RowDataPacket[][]>(query, [res.email, userPassword]);
    db.release();
    return Response.json(
      {
        status: response.success,
        message: "User Registered Successfully",
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      { status: response.error, error: error.message },
      { status: 400 }
    );
  }
}
