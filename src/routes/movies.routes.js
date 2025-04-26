import { Router } from "express";
import { seedMovies } from "../controllers/movie.controlle.js";

const router = Router();

router.route("/seed").post(seedMovies);

export default router;
