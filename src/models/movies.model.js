import { pool } from "../db/db.js";

const createMovieTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  release_date DATE,
  revenue BIGINT,
  popularity FLOAT,
  vote_average FLOAT,
  vote_count INT,
  overview TEXT,
  poster_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
  );
};

const genericTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS genres (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100)
);`
  );
};

const castTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS casts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  character_name VARCHAR(255),
  profile_path VARCHAR(255)
);`
  );
};

const movie_gen = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id INT,
  genre_id INT,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);`
  );
};

const movie_cast = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS movie_casts (
  movie_id INT,
  cast_id INT,
  PRIMARY KEY (movie_id, cast_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (cast_id) REFERENCES casts(id) ON DELETE CASCADE
);`
  );
};

export { createMovieTable, genericTable, castTable, movie_gen, movie_cast };
