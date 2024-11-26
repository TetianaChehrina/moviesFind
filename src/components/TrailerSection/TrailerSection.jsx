import { useEffect, useState } from "react";
import { fetchMovieTrailers } from "../../components/Api/Api";
import css from "./TrailerSection.module.css";

const TrailerSection = ({ movieId }) => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const data = await fetchMovieTrailers(movieId);
        setTrailers(data.results.filter((video) => video.type === "Trailer"));
      } catch (error) {
        setError(true);
      }
    };
    loadTrailers();
  }, [movieId]);

  if (error) return <p>Failed to load trailers.</p>;

  return (
    <div className={css.trailerSection}>
      <h2 className={css.title}>Trailers</h2>
      {trailers.length > 0 ? (
        <div className={css.trailerList}>
          {trailers.map((trailer) => (
            <div key={trailer.id} className={css.trailerItem}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      ) : (
        <p>No trailers available.</p>
      )}
    </div>
  );
};

export default TrailerSection;
