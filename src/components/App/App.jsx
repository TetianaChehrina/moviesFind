import { Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import { BookmarkProvider } from "../context/BookmarkContext.jsx";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage")
);

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BookmarkProvider>
      <div className={css.app}>
        <aside className={css.sidebar}>
          <Navigation />
        </aside>
        <main className={css.content}>
          <div className={css.container}>
            <Suspense fallback={<Loader />}>
              {loading && <Loader />}
              <Routes>
                <Route path="/" element={<HomePage onLoading={setLoading} />} />
                <Route
                  path="/movies"
                  element={<MoviesPage onLoading={setLoading} />}
                />
                <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                  <Route path="cast" element={<MovieCast />} />
                  <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="/favorites" element={<FavoritesPage />} />{" "}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </BookmarkProvider>
  );
}
