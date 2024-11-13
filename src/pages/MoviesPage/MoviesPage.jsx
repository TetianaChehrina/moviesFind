import { useState, useEffect } from "react";
import { fetchMovie } from "../../components/Api/Api";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovieName = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchSearchMovies = async () => {
      if (!searchMovieName) {
        setMovieSearch([]);
        return;
      }

      try {
        setError(false);
        const data = await fetchMovie(searchMovieName);

        if (data && data.results) {
          setMovieSearch(data.results);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(true);
      }
    };

    fetchSearchMovies();
  }, [searchMovieName]);

  const handleMovie = (query) => {
    setSearchParams({ query });
  };

  const handleReset = () => {
    setSearchParams({});
    setMovieSearch([]);
    setError(false);
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.formContainer}>
        <SearchForm onSearch={handleMovie} />
        <button className={css.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
      {error && <Error />}
      {movieSearch.length > 0 && <MovieList movies={movieSearch} />}
    </div>
  );
};

export default MoviesPage;
