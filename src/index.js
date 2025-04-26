import dotenv from "dotenv";
import { dbConnection } from "./db/db.js";
import app from "./app.js";
import { createUserTable } from "./models/users.model.js";
import {
  castTable,
  createMovieTable,
  genericTable,
  movie_cast,
  movie_gen,
} from "./models/movies.model.js";

dotenv.config();

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is listening on PORT  ${process.env.PORT}`);
      createUserTable();
      createMovieTable();
      genericTable();
      castTable();
      movie_gen();
      movie_cast;
    });
  })
  .catch((error) => {
    console.log("Something went wrong", error);
  });
