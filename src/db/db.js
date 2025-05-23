import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const dbConnection = async () => {
  try {
    await pool.getConnection();
    console.log("Database connected Successfully!!");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export { dbConnection };
