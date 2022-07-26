import { Link } from 'react-router-dom';
import pokedexLogo from '../images/pokedex-logo.png';
import './Header.css';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={pokedexLogo} alt="Pokedex Logo" />
      </Link>
      <nav>
        <Link to="/pokemon">Pokémon</Link>
        <Link to="/types">Types</Link>
        <Link to="/whos-that-pokemon">Who&apos;s that pokemon</Link>
      </nav>
    </header>
  );
}

export default Header;
