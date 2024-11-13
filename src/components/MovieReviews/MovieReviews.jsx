import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
import { fetchReviews } from "../Api/Api";
import css from "./MovieReviews.module.css";

export default function MovieReviws() {
  const [error, setError] = useState([]);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewsLoad = async () => {
      try {
        setError(false);
        const reviewsAll = await fetchReviews(movieId);
        setReviews(reviewsAll.data.results);
        console.log(reviewsAll.data.results);
      } catch (error) {
        setError(true);
      }
    };
    reviewsLoad();
  }, [movieId]);
  return (
    <div className={css.reviews}>
      {error && <Error />}
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We do not have any reviews for this movie yet</p>
        )}
      </ul>
    </div>
  );
}
