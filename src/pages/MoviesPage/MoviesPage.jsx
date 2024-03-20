import css from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MoveList';
import SearchForm from '../../components/SearchForm/SearchForm';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryFromParams = searchParams.get('query') ?? '';
    setQuery(queryFromParams);
  }, [searchParams]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (value === '') {
      alert("Can't find movies while input field is empty");
      toast.error('Please enter text to search movies!');
      return;
    }

    // Change the order of actions to avoid race conditions
    setSearchParams({ query: value });
    setValue('');
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await searchMovies(query);

        if (data.results.length === 0) {
          alert(`Sorry, no movies found by query: ${query}`);
          toast.error('Please try another query!');
          setError(true); // Update error state in case of no results
          setMovies([]); // Set movies to empty array
          return;
        }
        setMovies(data.results);
        setError(false);
      } catch (error) {
        setError(true);
        console.error(error);
        toast.error('Error fetching movies');
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      getData();
    }
  }, [query]);

  const changeMovieFilter = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={css.container}>
      <Toaster />
      <SearchForm
        onFormSubmit={onFormSubmit}
        value={value}
        changeMovieFilter={changeMovieFilter}
      />
      {isLoading && <b>Loading search movies...</b>}
      {error && <b>HTTP error!🤔</b>}
      {movies.length > 0 && <MovieList movies={movies} />} {/* Render MovieList only when there are movies */}
    </div>
  );
}