import axios from "axios";

const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function fetchMovie(searchQuery) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,

    {
      headers: {
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchTrendingMovies() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchReviews(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response;
}

export async function fetchCast(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      headers: {
        Accept: `application / json`,
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchDetails(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      headers: {
        Accept: `application / json`,
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function fetchMovieTrailers(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    {
      headers: {
        Authorization: `Bearer ${VITE_API_TOKEN}`,
      },
    }
  );
  return response.data;
}
