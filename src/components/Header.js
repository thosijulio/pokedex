import { Link } from 'react-router-dom';
import pokedexLogo from '../images/pokedex-logo.png';
import './Header.css';

function Header() {
  return (
    <header>
      <img src={pokedexLogo} alt="Pokedex Logo" />
      <nav>
        <Link to="/pokemon">Pokemon</Link>
      </nav>
    </header>
  );
}

export default Header;
