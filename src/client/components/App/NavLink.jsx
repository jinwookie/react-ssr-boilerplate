import { Link, withRouter } from 'react-router-dom';

const NavLink = ({
  to,
  location,
  children,
}) => (
  <li className={location.pathname === to ? 'active' : ''}>
    <Link to={to}>
      {children}
    </Link>
  </li>
);

export default withRouter(NavLink);
