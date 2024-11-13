import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchDetails } from "../../components/Api/Api.js";
import { useEffect, useState, Suspense, useRef } from "react";
import { useBookmarks } from "../..//components/context/UseBookmarks.js";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader.jsx";
import TrailerSection from "../../components/TrailerSection/TrailerSection";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]);
  const [release, setRelease] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const { addBookmark, bookmarks, removeBookmark } = useBookmarks();

  useEffect(() => {
    if (!movieId) return;
    const MovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchDetails(movieId);
        setMovie(response);
        setRelease(response.release_date.slice(0, 4));
        setGenres(response.genres);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    MovieDetails();
  }, [movieId]);

  const { poster_path, title, vote_average, overview } = movie;

  const isBookmarked = bookmarks.some((item) => item.id === movie.id);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(movie.id);
    } else {
      addBookmark(movie);
    }
  };

  return (
    <>
      <div>
        <div className={css.btnBack}>
          {error && <Error />}
          <button className={css.backLink_btn}>
            <Link to={backLinkRef.current} className={css.backLink}>
              <GoArrowLeft className={css.icon} />
              Go back
            </Link>
          </button>
        </div>
        {loading && <Loader />}
        <div className={css.container}>
          <img
            className={css.imageMovie}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />

          <div className={css.movieInfo}>
            <h1 className={css.title}>{`${title} (${release})`}</h1>
            <h2 className={css.score}>
              User score: {`${Math.round(vote_average * 10)}%`}
            </h2>
            <h2 className={css.overview}>Overview</h2>
            <p className={css.overview_text}>{overview}</p>
            <div className={css.genre}>
              <h3 className={css.genres_title}>Genres:</h3>
              <ul className={css.genreList}>
                {genres.map(({ id, name }) => (
                  <li key={id}>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleBookmarkToggle}
              className={css.bookmarkButton}
            >
              {isBookmarked ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
        <TrailerSection movieId={movieId} />
        <div>
          <p className={css.addInfo}>Additional information</p>
          <ul>
            <li>
              <Link to="cast" className={css.add_list}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className={css.add_list}>
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
}
