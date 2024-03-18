import { Link, useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getCredits } from '../../movies-api';

export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getCredits(movieId);
        console.log('data:', data);
        setCredits(data.cast);
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
      {isLoading && <b>Loading cast...</b>}
      {error && <b>HTTP error! Error fetching cast. Please try again later.</b>}
      {credits ? (
        credits.map(cast => (
          <div key={cast.id} className={css.card}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                  : defaultImg
              }
              alt={cast.name}
              width={300}
            />
            <b>{cast.name}</b>
            <p>Character: {cast.character}</p>
            <Link to={`/movies/${movieId}`}>Back to movie</Link>
          </div>
        ))
      ) : (
        <b>Sorry, no info about casts available.</b>
      )}
    </div>
  );
}
