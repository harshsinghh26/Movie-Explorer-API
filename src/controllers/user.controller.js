import { pool } from "../db/db.js";
import {
  generateAccessToken,
  hashPassword,
  isPasswordCorrect,
  userModel,
} from "../models/users.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// generate Tokens

const generateToken = async (userId) => {
  try {
    const accessToken = generateAccessToken(userId);

    return accessToken;
  } catch (error) {
    throw new ApiError(error.code, error);
  }
};

// register user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required!!");
  }

  const hashedPassword = await hashPassword(password);

  const user = await userModel.createUser(name, email, hashedPassword);

  const { password: _, ...safeUser } = user;

  return res
    .status(201)
    .json(
      new ApiResponse(200, { user: safeUser }, "User register Successfully!!")
    );
});

// Login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required!!");
  }

  const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (result.length === 0) {
    throw new ApiError(404, "No user Found!!");
  }

  const user = result[0];

  const checkPassword = await isPasswordCorrect(password, user.password);

  if (!checkPassword) {
    throw new ApiError(401, "Wrong user Credentials!!");
  }

  const accessToken = await generateToken({ id: user.id });

  const { password: _, refresh_token, ...loggedInUser } = user;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User Logged In Successfully!!"
      )
    );
});

export { registerUser, loginUser };
