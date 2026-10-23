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

  //Filter by Titles with the letter O
  let oNames = movies.filter(m => m.title.toLowerCase().includes("o"));

  //Create a new State Variable that stores the selected movie's title
  //setSelectedName is the built-in function that updates the variable
  //Use the first available movie title as a safe default
  let [selectedName, setSelectedName] = useState(defaultMovieTitle);

  //Event Handler when the People drop down gets a different selected name
  function handleNameChange(event: React.ChangeEvent<HTMLSelectElement>) {
    //Update the selectedName State Variable
    setSelectedName(event.target.value);
  }

  //Display the Name and Age input in a pop up
  function Display() {
    let name = document.querySelector<HTMLInputElement>("#name");
    let age = document.querySelector<HTMLInputElement>("#age");

    if (name && age) {
        alert("Name: " + name.value + " - Age: " + age.value);
    }
  }

  //UI
  return (
    <form onSubmit={Display}>
<div style={{ display: "flex", justifyContent: "center" }}>

        <img src={logo} style={{ width: "300px", height: "150px" }} />

      </div>
      <div>
        <label>Name: </label>
        <input id="name"></input>
      </div>
      <div>
        <label>Year:</label>
        <input id="age" type="number" min="0" max="100" required></input>
      </div>
      <br />
      <div>
        <button type="submit">Submit</button>
      </div>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
           
            {//Display the contents of the Movies array in a new table
            movies.map((movie, loop) => (
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
      <br />
       <div>
          <label>People: </label>
          {
          // Create a new drop down connected to our State Variable and event handler
          }
          <select id="name"
          value={selectedName}
          onChange={handleNameChange}
          >
            {//Map the Names in the People array to the select dropdown
            movies.map(m => (
              <option key={m.title}
                  value={m.title}>
                  {m.title}
              </option>
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











