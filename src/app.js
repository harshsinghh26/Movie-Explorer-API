import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import the user Router

import router from "./routes/user.routes.js";

app.use("/api/v1/users", router);

// import movie route

import movieRouter from "./routes/movies.routes.js";

app.use("/api/v1/movie", movieRouter);

export default app;
