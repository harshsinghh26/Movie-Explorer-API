import axios from "axios";
import { fallback } from "../fallback.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://developer.themoviedb.org/3";

export const fetchMovies = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    // console.log(data);
    return data.results;
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    return fallback;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return data.cast || [];
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    return [];
  }
};
