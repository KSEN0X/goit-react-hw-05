//npm install axios
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// const TMDB_API_KEY = 'b8b5881b81685295a6abd36f3fc334f1';

const TMDB_ACCES_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGI1ODgxYjgxNjg1Mjk1YTZhYmQzNmYzZmMzMzRmMSIsInN1YiI6IjY1Zjg1NmY5ZDhmNDRlMDE3YzUyN2FiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A9ESG1F4UMASMhIdeF6tKTJmv3tPSQdGWYVJd1TSmZ8';

const pathname = '/trending/movie/day';

const options = {
  headers: {
    Authorization: `Bearer ${TMDB_ACCES_TOKEN}`,
  },
};

export const getMovies = async () => {
  try {
    const response = await axios.get(pathname, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

export const getMovieById = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by Id', error);
    throw error;
  }
};

export const getCredits = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching credits', error);
    throw error;
  }
};

export const getReviews = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews', error);
    throw error;
  }
};

export const searchMovies = async query => {
  try {
    const response = await axios.get(`/search/movie?query=${query}`, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by query', error);
    throw error;
  }
};
