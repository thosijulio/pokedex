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
          <a className="fa-brands fa-github" href="https://www.github.com/thosijulio" />
          <a className="fa-brands fa-linkedin" />
          <a className="fa-brands fa-instagram" />
        </div>
      </section>
    </main>
  );
}

export default Home;
