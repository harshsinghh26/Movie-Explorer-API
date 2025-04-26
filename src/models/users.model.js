import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      refresh_token TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
};

const createUser = async (name, email, password) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  const inserted_id = result.insertId;

  const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
    inserted_id,
  ]);
  return user[0];
};

// password hash fucntion

export const hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// compare password

export const isPasswordCorrect = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

// Generate Access Token

export const generateAccessToken = function (user) {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const userModel = { createUser };
export { createUserTable };
