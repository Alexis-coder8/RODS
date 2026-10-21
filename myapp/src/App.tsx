//Library Imports
import csvText from "./data.csv?raw"; //Raw CSV data file
import Papa from "papaparse"; //External library used for reading CSVs
import { useState } from "react"; //State allows us to update UI when data changes
import "./App.css"; //Use our style file

//Web App's Default Page
function App() {
  //Store the contents of the CSV
  let csvArray : any[] = Papa.parse(
    csvText,
    {header: true, skipEmptyLines: true}
  ).data;

  //Fill the contents of the CSV into a table variable
  let people: Person[] = [];

  //Loop once for each data row in the CSV file
  for (let loop: number = 0; loop < csvArray.length; loop++) {
    //Store the contents of the current row
    let row = csvArray[loop];

    //Convert the row's contents into a Person object
    let person = new Person();
    person.name = row.name;
    person.age = row.age;
    person.isStudent = Boolean(Number(row.isStudent));
   
    //Add the Person object into the People array
    people.push(person);
  }

  //Search by name
  let findAlexis = people.find(p => p.name === "Alexis")!;

  // Find Students (Is Student = Yes)
  let students = people.filter(p => Boolean(Number(p.isStudent)));

  //Filter by Names with the letter O
  let oNames = people.filter(p => p.name.toLowerCase().includes("o"));

  //Create a new State Variable that stores the selected person's name
  //setSelectedName is the built-in function that updates the variable
  //"Alexis" is the default value
  let [selectedName, setSelectedName] = useState("Alexis");

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
      {
      // Return a form as the main component of the web app
      // Run the Display function when two things happen:
      // 1. The Submit button is pushed
      // 2. All the form's validation rules are met
      }
      <div>
        <label>Name: </label>
        <input id="name"></input>
      </div>
      <div>
        <label>Age:</label>
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
              <th>Name</th>
              <th>Age</th>
              <th>Is Student</th>
            </tr>
          </thead>

          <tbody>
           
            {//Display the contents of the People array in a new table
            people.map((person, loop) => (
              <tr key={loop}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.isStudent ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div>
            <label>Search by name results: </label>{findAlexis.age}
      </div>
      <div>
            <label>Number of students: </label>{students.length}
      </div>
      <div>
            <label>Number of names with the letter O: </label>{oNames.length}
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
            people.map(p => (
              <option key={p.name}
                  value={p.name}>
                  {p.name}
              </option>
            ))}
          </select>
      </div>
       <div>
            <label>Selected Age: </label>{people.find(p => p.name === selectedName)?.age}
      </div>
      <div>
            <label>Selected Is Student: </label>{people.find(p => p.name === selectedName)?.isStudent ? "Yes" : "No"}
      </div>
    </form>
  )
}

export default App;

class Person {
  name!: string;
  age!: number;
  isStudent!: boolean;
}
