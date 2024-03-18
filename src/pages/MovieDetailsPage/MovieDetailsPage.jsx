import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { RiArrowGoBackFill } from 'react-icons/ri';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { getMovieById } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
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
      <button className={css.btn} type="submit">
        <RiArrowGoBackFill className={css.icon} />
        <NavLink to={backLinkRef.current} className={css.btnText}>
          go Back
        </NavLink>
      </button>
      {isLoading && <b>Loading details...</b>}
      {error && (
        <b>HTTP error! Error fetching details. Please try again later.</b>
      )}
      {movie && (
        <div className={css.movieCard}>
          <img
            className={css.moviePoster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            width={350}
            alt="poster"
          ></img>
          <ul className={css.movieInfo}>
            <li className={css.title}>
              <b>{movie.title}</b>
              <span>User Score: {Math.round(movie.vote_average * 10)}%</span>
            </li>
            <li>
              <b>Overview</b>
              <span>{movie.overview}</span>
            </li>
            <li>
              <b>Genres</b>
              <span>
                {movie.genres.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    {genre.name}
                    {index < movie.genres.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </span>
            </li>
          </ul>
        </div>
      )}
      <p>Additional information</p>
      <ul className={css.subPageContainer}>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<b>Loading sub component...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
