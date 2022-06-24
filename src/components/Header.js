import pokedexLogo from '../images/pokedex-logo.png';
import './Header.css';

function Header() {
  return (
    <header>
      <img src={pokedexLogo} alt="Pokedex Logo" />
      <nav>
        <h2>Pokemon button</h2>
      </nav>
    </header>
  );
}

export default Header;
