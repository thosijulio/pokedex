/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="main-not-found">
      <i className="fa-solid fa-ban fa-5x" />
      <h1>Sorry, this page isn't available.</h1>
      <h3>
        The link you followed may not exists or are not implemented yet. Please, return to the{' '}
        <Link to="/">main page.</Link>
      </h3>
    </main>
  );
}

export default NotFound;
