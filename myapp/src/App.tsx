import { useState } from "react";

class Person {
  name!: string;
  age!: number;
  isStudent!: boolean;
}

function App() {
  // Variables
  const name: string = "Alexis";
  let age: number = 16;
  let isStudent: boolean = true;
  let colors: string[] = ["pink", "orange", "purple"];

  // Create Person object
  let student = new Person();
  student.name = name;
  student.age = age;
  student.isStudent = isStudent;

  // People array
  let people: Person[] = [
    { name: "Alexis", age: 16, isStudent: true },
    { name: "Jane", age: 16, isStudent: false },
    { name: "Isaac", age: 19, isStudent: false },
  ];

  // Conditions
  let message: string = "Start";
  let score: number = 50;

  if (score >= 60) {
    message = "Pass";
  } else {
    message = "try again";
  }

  // While loop
  let isActive: boolean = false;
  while (isActive) {
    message = "loop";
    isActive = false;
  }

  // For loop
  let loops: number = 0;
  for (; loops < 3; ) {
    loops = loops + 1;
  }

  // React state
  const [selectedName, setSelectedName] = useState("Alexis");

  // Dropdown handler
  function handleNameChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedName(e.target.value);
  }

  // Filter names containing "a"
  const aNames = people.filter((p) =>
    p.name.toLowerCase().includes("a")
  );

  // Multiply function
  function Multiply(number1: number, number2: number): number {
    return number1 * number2;
  }

  let sum: number = Multiply(8, 7);

  // PrintScore function
  function printScore(parameter: string): string {
    try {
      let score: number = Number(parameter);

      if (isNaN(score)) {
        throw new Error("Error not a number");
      }

      return "Valid score: " + score;
    } catch (Error) {
      return "invalid score";
    }
  }

  // FINAL RETURN — everything must be inside here
  return (
    <div style={{ padding: "20px" }}>
      <div>
        <label>Colors: </label>
        {colors.join(", ")}
      </div>

      <div>
        <label>Names containing “a”: </label>
        {aNames.map((p) => p.name).join(", ")}
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Search by name results: </label>
        {(people.find((p) => p.name === "Alexis")!)?.name}
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>People: </label>
        <select
          id="name"
          value={selectedName}
          onChange={handleNameChange}
        >
          {people.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Name: </label>
        <input />
      </div>

      <div style={{ marginTop: "20px" }}>
        Hello {selectedName}
      </div>

      <div style={{ marginTop: "20px" }}>
        <strong>Message:</strong> {message}
      </div>

      <div>
        <strong>Loops:</strong> {loops}
      </div>

      <div>
        <strong>Multiply Result (8 × 7):</strong> {sum}
      </div>

      <div>
        <strong>Print Score:</strong> {printScore("50")}
      </div>
    </div>
  );
}

export default App;
