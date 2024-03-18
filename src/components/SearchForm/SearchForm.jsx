import css from './SearchForm.module.css';

export default function SearchForm({ onFormSubmit, value, changeMovieFilter }) {
  return (
    <form className={css.form} onSubmit={onFormSubmit}>
      <input
        type="text"
        name="find_movie"
        value={value}
        onChange={changeMovieFilter}
      />
      <button className={css.btnSearch}>Search</button>
    </form>
  );
}
