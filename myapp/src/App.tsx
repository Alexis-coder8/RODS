//Library Imports
import Papa from "papaparse"; //External library used for reading CSVs
import { useState } from "react"; //State allows us to update UI when data changes
import "./App.css"; //Use our style file
import csvText from "./movies.csv?raw";
import logo from "./logo.png"; // Logo image file






//Web App's Default Page
function App() {
  //Store the contents of the CSV
  let csvArray : any[] = Papa.parse(
    csvText,
    {header: true, skipEmptyLines: true}
  ).data;

  //Fill the contents of the CSV into a table variable
  let movies: Movie[] = [];

  //Loop once for each data row in the CSV file
  for (let loop: number = 0; loop < csvArray.length; loop++) {
    //Store the contents of the current row
    let row = csvArray[loop];

    //Convert the row's contents into a Movie object
    let movie = new Movie();
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
   
    //Add the Movie object into the Movies array
    movies.push(movie);
  }

  //Search by title using a valid default in case the requested title is missing
  const defaultMovieTitle = movies[0]?.title ?? "The Dark Knight";
  const findMovie = movies.find(m => m.title === "The Shawshank Redemption") ?? movies[0] ?? { title: defaultMovieTitle };

  // Find Movies with a rating above 8.0
  let above8 = movies.filter(m => Number(m.rating) > 8.0);

  //Filter by Titles with the letter a and o
  let aNames = movies.filter(m => m.title.toLowerCase().includes("a"));
  let oNames = movies.filter(m => m.title.toLowerCase().includes("o"));

  //Create a new State Variable that stores the selected movie's title
  //setSelectedName is the built-in function that updates the variable
  //Use the first available movie title as a safe default
  let [selectedName, setSelectedName] = useState(defaultMovieTitle);

  //Update the selected movie when the dropdown changes
  function handleNameChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedName(event.target.value);
  }

  //Display the entered name and year in a pop up
  function Display() {
    let name = document.querySelector<HTMLInputElement>("#visitor-name");
    let year = document.querySelector<HTMLInputElement>("#visitor-age");

    if (name && year) {
        alert("Name: " + name.value + " - Year: " + year.value);
    }
  }

  //UI
  return (
    <form className="movie-app" onSubmit={(event) => { event.preventDefault(); Display(); }}>
      <div className="logo-container">
        <img src={logo} className="app-logo" alt="RODS" />
      </div>
      <div>
        <label htmlFor="visitor-name">Name: </label>
        <input id="visitor-name" name="name" />
      </div>
      <div>
        <label htmlFor="visitor-year">Year:</label>
        <input id="visitor-year" name="year" type="number" min="2005" max="2023" required />
      </div>
      <br />
      <div>
        <button type="submit">Submit</button>
      </div>
      <br />
      <div className="table-wrap">
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
      <br />
      <div>
        <label>Search by title results: </label>{findMovie.title}
      </div>
      <div>
        <label>Number of movies with rating above 8.0: </label>{above8.length}
      </div>
      <div>
        <label>Number of titles with the letter O: </label>{oNames.length}
      </div>
      <div>
        <label>Number of titles with the letter A: </label>{aNames.length}
      </div>
      <br />
      <div>
        <label htmlFor="movie-select">People: </label>
        <select
          id="movie-select"
          value={selectedName}
          onChange={handleNameChange}
        >
          {movies.map(m => (
            <option key={m.title} value={m.title}>{m.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Selected Year: </label>{movies.find(m => m.title === selectedName)?.year}
      </div>
      <div>
        <label>Selected Rating: </label>{movies.find(m => m.title === selectedName)?.rating}
      </div>
    </form>
  )
}

export default App;
 



//Rank,Title,Genre,Description,Director,Actors,Year,Runtime (Minutes),Rating,Votes,Revenue (Millions),Metascore
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








