import { Link } from 'react-router-dom';
import Nav from './Nav';
import './Header.scss';

const Header = () => (
  <header className="header">
    <Link to="/" className="logo">JINWOOKIE</Link>
    <Nav />
  </header>
);

export default Header;
