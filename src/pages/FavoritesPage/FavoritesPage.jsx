import { useBookmarks } from "../../components/context/UseBookmarks.js";
import { Link } from "react-router-dom";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Favorites movies</h1>
      {bookmarks.length > 0 ? (
        <ul className={css.movieList}>
          {bookmarks.map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} className={css.movieLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={css.movieImage}
                />
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
