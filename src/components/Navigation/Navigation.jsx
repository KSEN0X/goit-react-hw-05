import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from '../Navigation/Navigation.module.css';

const addLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={addLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={addLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
