import { useBookmarks } from "../../components/context/UseBookmarks.js";
import { Link } from "react-router-dom";
import css from "./BookmarkList.module.css";

export const BookmarkList = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className={css.bookmarkList}>
      <h3>Favorites movies</h3>
      <ul className={css.list}>
        {bookmarks.map((movie) => (
          <li key={movie.id} className={css.listItem}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={css.movieImage}
              />
              <h4>{movie.title}</h4>
            </Link>
          </li>
        ))}
        {bookmarks.length === 0 && <p>No favorites yet</p>}
      </ul>
    </div>
  );
};

export default BookmarkList;
