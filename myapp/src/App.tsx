import Papa from "papaparse";
import { useState } from "react";
import "./App.css";
import csvText from "./movies.csv?raw";
import logo from "./logo.png";

function App() {
  const csvArray: any[] = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  }).data;

  const movies: Movie[] = [];

  for (let loop = 0; loop < csvArray.length; loop++) {
    const row = csvArray[loop];
    const movie = new Movie();

    movie.rank = row.Rank;
    movie.title = row.Title;
    movie.genre = row.Genre;
    movie.description = row.Description;
    movie.director = row.Director;
    movie.actors = row.Actors;
    movie.year = row.Year;
    movie.runtimeMinutes = row["Runtime (Minutes)"];
    movie.rating = row.Rating;
    movie.votes = row.Votes;
    movie.revenueMillions = row["Revenue (Millions)"];
    movie.metascore = row.Metascore;

    movies.push(movie);
  }

  const defaultMovieTitle = movies[0]?.title ?? "The Dark Knight";
  const findMovie = movies.find((m) => m.title === "The Shawshank Redemption") ?? movies[0] ?? { title: defaultMovieTitle };
  const above8 = movies.filter((m) => Number(m.rating) > 8.0);
  const aNames = movies.filter((m) => m.title.toLowerCase().includes("a"));
  const oNames = movies.filter((m) => m.title.toLowerCase().includes("o"));
  const [selectedName, setSelectedName] = useState(defaultMovieTitle);
  const selectedMovie = movies.find((m) => m.title === selectedName) ?? findMovie;

  function handleNameChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedName(event.target.value);
  }

  function Display() {
    const name = document.querySelector<HTMLInputElement>("#visitor-name");
    const year = document.querySelector<HTMLInputElement>("#visitor-age");

    if (name && year) {
      alert("Name: " + name.value + " - Year: " + year.value);
    }
  }

  return (
    <form
      className="movie-app"
      onSubmit={(event) => {
        event.preventDefault();
        Display();
      }}
    >
      <div className="movie-shell">
        <header className="movie-hero">
          <div className="logo-wrap">
            <img src={logo} className="app-logo" alt="RODS" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Cinema tracker</p>
            <h1>RODS Movie Vault</h1>
            <p>
              A bold little spotlight for your favorite films, ratings, and all the must-watch picks in one place.
            </p>
          </div>
        </header>

        <section className="stats-grid" aria-label="Movie stats overview">
          <div className="stat-card">
            <span>Total titles</span>
            <strong>{movies.length}</strong>
          </div>
          <div className="stat-card accent">
            <span>8.0+ rated</span>
            <strong>{above8.length}</strong>
          </div>
          <div className="stat-card">
            <span>Contains O</span>
            <strong>{oNames.length}</strong>
          </div>
          <div className="stat-card">
            <span>Contains A</span>
            <strong>{aNames.length}</strong>
          </div>
        </section>

        <section className="panel-grid">
          <div className="panel form-panel">
            <h2>Visitor pass</h2>
            <div className="field-row">
              <label htmlFor="visitor-name">Name</label>
              <input id="visitor-name" name="name" placeholder="Enter your name" />
            </div>
            <div className="field-row">
              <label htmlFor="visitor-age">Year</label>
              <input id="visitor-age" name="year" type="number" min="2005" max="2023" required placeholder="2023" />
            </div>
            <button type="submit">Submit</button>
          </div>

          <div className="panel spotlight-panel">
            <h2>Featured pick</h2>
            <p className="spotlight-title">{findMovie.title}</p>
            <div className="meta-line">
              <span>Search result</span>
              <span>{findMovie.title}</span>
            </div>
            <div className="meta-line">
              <span>Above 8.0</span>
              <span>{above8.length}</span>
            </div>
            <div className="meta-line">
              <span>Letter O</span>
              <span>{oNames.length}</span>
            </div>
            <div className="meta-line">
              <span>Letter A</span>
              <span>{aNames.length}</span>
            </div>
          </div>
        </section>

        <div className="panel selector-panel">
          <div className="selector-head">
            <h2>Movie spotlight</h2>
            <div className="select-wrap">
              <label htmlFor="movie-select">Pick a title</label>
              <select
                id="movie-select"
                value={selectedName}
                onChange={handleNameChange}
              >
                {movies.map((movie) => (
                  <option key={movie.title} value={movie.title}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="selected-details">
            <div>
              <span>Selected year</span>
              <strong>{selectedMovie.year}</strong>
            </div>
            <div>
              <span>Selected rating</span>
              <strong>{selectedMovie.rating}</strong>
            </div>
            <div>
              <span>Director</span>
              <strong>{selectedMovie.director}</strong>
            </div>
          </div>
        </div>

        <div className="table-wrap panel">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, loop) => (
                <tr key={loop}>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>{movie.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
}

export default App;

class Movie {
  rank!: string;
  title!: string;
  genre!: string;
  description!: string;
  director!: string;
  actors!: string;
  year!: string;
  runtimeMinutes!: string;
  rating!: string;
  votes!: string;
  revenueMillions!: string;
  metascore!: string;
}


