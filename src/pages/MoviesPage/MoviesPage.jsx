import css from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MoveList';
import SearchForm from '../../components/SearchForm/SearchForm';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  // URLSearchParams.get(key), wait for 'key', return  value або null
  const query = searchParams.get('query') ?? '';

 
  const onFormSubmit = e => {
    e.preventDefault();
    if (value === '') {
      alert("Can't find movies while input field is empty");
      toast.error('Please enter text to search movies!');
      return;
    }
    setSearchParams({ query: value });
    setValue(''); 
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        const data = await searchMovies(query);

        if (data.results.length == 0) {
          alert(`Sorry don't found any by query: ${query}`);
          toast.error('Please try another query!');
          return;
        }
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.error(error);
        toast.error('Error fetching movies');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query]);

 
  const changeMovieFilter = e => {
    setValue(e.target.value);
  };

  
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

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
      <MovieList movies={filteredMovies} />
    </div>
  );
}
