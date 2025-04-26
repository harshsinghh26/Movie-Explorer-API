import {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
} from "./fetchMovie.js";
import { pool } from "../db/db.js";

export const seedMovies = async () => {
  try {
    const totalPages = 25;
    for (let page = 1; page <= totalPages; page++) {
      console.log(`Fetching page ${page}...`);
      const movies = await fetchMovies(page);

      for (const movie of movies) {
        const details = await fetchMovieDetails(movie.id);
        const credits = await fetchMovieCredits(movie.id);

        if (!details) continue;

        const [movieResult] = await pool.query(
          `INSERT INTO movies 
          (title, overview, release_date, popularity, vote_average, vote_count, revenue) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            details.title,
            details.overview,
            details.release_date,
            details.popularity,
            details.vote_average,
            details.vote_count,
            details.revenue,
          ]
        );
        const movieId = movieResult.insertId;

        for (const genre of details.genres) {
          await pool.query(
            `INSERT IGNORE INTO genres (id, name) VALUES (?, ?)`,
            [genre.id, genre.name]
          );

          await pool.query(
            `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)`,
            [movieId, genre.id]
          );
        }

        const topCast = credits.slice(0, 5);
        for (const actor of topCast) {
          await pool.query(
            `INSERT IGNORE INTO casts (id, name, character_name) VALUES (?, ?, ?)`,
            [actor.id, actor.name, actor.character]
          );

          await pool.query(
            `INSERT INTO movie_cast (movie_id, cast_id) VALUES (?, ?)`,
            [movieId, actor.id]
          );
        }

        console.log(`Inserted movie: ${details.title}`);
      }
    }

    console.log("✅ Movies, Genres, and Casts seeding done!");
  } catch (error) {
    console.error("❌ Error while seeding movies:", error);
  }
};
