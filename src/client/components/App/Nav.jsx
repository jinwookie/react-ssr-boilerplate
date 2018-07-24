import NavLink from './NavLink';
import './Nav.scss';

const Nav = ({
  location
}) => (
  <nav className="header__nav">
    <ul>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/todos">Todos</NavLink>
    </ul>
  </nav>
);

export default Nav;
