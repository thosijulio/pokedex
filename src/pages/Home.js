import './Home.css';

function Home() {
  return (
    <main>
      <section>
        <h3>
          Welcome! This is a website to provide information about the Pokémon World developed by a
          fan. if you have any questions, please get in touch.
        </h3>
        <div className="linked-icons">
          <a
            className="fa-brands fa-github"
            href="https://www.github.com/thosijulio"
            target="_blank"
            rel="noopener noreferrer"
          />
          <a
            className="fa-brands fa-linkedin"
            href="https://linkedin.com/in/thosijulio"
            target="_blank"
            rel="noopener noreferrer"
          />
          <a
            className="fa-brands fa-instagram"
            href="https://instagram.com/thosijulio"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
