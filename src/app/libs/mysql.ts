/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql, { Pool, RowDataPacket, PoolConnection } from "mysql2/promise";

let pool: Pool | null = null;

const getPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost", //process.env.NEXT_PUBLIC_HOST,
      user: "root", //process.env.NEXT_PUBLIC_USER,
      port: Number(3306), //Number(process.env.NEXT_PUBLIC_DATABASE_PORT),
      password: "1234", // process.env.NEXT_PUBLIC_PASSWORD,
      database: "jewellery_new", //process.env.NEXT_PUBLIC_DATABASE_NAME,
      waitForConnections: true,
    });
  }
  return pool;
};

async function executeQuery<T extends RowDataPacket>(
  query: string,
  values?: any[]
): Promise<T[]> {
  let connection: PoolConnection | undefined;
  try {
    const poolInstance = await getPool();
    connection = await poolInstance.getConnection();
    const [rows] = await connection.execute<T[]>(query, values);
    return rows;
  } catch (error) {
    console.error("MySQL query error:", error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export { executeQuery, closePool };
