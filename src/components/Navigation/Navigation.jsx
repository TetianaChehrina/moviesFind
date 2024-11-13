import { NavLink } from "react-router-dom";
import {
  AiOutlineVideoCamera,
  AiOutlineBook,
  AiOutlineAppstore,
} from "react-icons/ai";
import css from "./Navigation.module.css";

export default function Navigation() {
  const getLinkClass = ({ isActive }) =>
    `${css.link} ${isActive ? css.active : ""}`;

  return (
    <aside className={css.container}>
      <div className={css.logo}>MoviesFind</div>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getLinkClass}>
              <AiOutlineAppstore className={css.icon} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getLinkClass}>
              <AiOutlineVideoCamera className={css.icon} /> Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={getLinkClass}>
              <AiOutlineBook className={css.icon} /> Bookmarks
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
