import { NavLink } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={css.moviesList}>
      {movies.map(movie => (
        <li className={css.moviesItem} key={movie.id}>
          <NavLink
            to={`/movies/${movie.id}`}
            state={{ from: `${location.pathname}${location.search}` }}
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
