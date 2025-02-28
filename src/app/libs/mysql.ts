/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql, { Pool, RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "",
      database: "jewellery",
      waitForConnections: true,
    });
  }
  return pool.getConnection();
};

async function executeQuery<T extends RowDataPacket>(
  query: string,
  values?: any[]
): Promise<T[]> {
  try {
    const pool = await getConnection();
    const [rows] = await pool.execute<T[]>(query, values);
    return rows;
  } catch (error) {
    console.error("MySQL query error:", error);
    throw error;
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export { executeQuery, closePool };
