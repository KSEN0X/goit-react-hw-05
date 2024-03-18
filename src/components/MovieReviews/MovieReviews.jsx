import { Link, useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { getReviews } from '../../movies-api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getReviews(movieId);
        console.log('data:', data.results);
        setReviews(data.results);
      } catch (error) {
        setError(true);
        toast.error(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <div className={css.container}>
      <Toaster />
      {isLoading && <b>Loading reviews...</b>}
      {error && (
        <b>HTTP error! Error fetching reviews. Please try again later.</b>
      )}
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className={css.card}>
            <img
              src={
                review.avatar_path
                  ? `https://image.tmdb.org/t/p/w300${review.avatar_path}`
                  : defaultImg
              }
              alt={review.name}
              width={300}
            />
            <p>
              <b>Author: {review.author}</b>
            </p>
            <p>{review.content}</p>
            <Link to={`/movies/${movieId}`}>Back to movie</Link>
          </div>
        ))
      ) : (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
    </div>
  );
}
