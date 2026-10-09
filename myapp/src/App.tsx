class Person {
  name!: string;
  age!: number;
  isStudent!: boolean;
}

function App() {
 const name: string = "Alexis";
 let age : number = 16;
 let isStudent: boolean = true;
 let colors:string[] = ["pink", "orange","purple"]

 let student= new Person();

 student.name = name;
 student.age = age;
 student.isStudent = isStudent


 let people: Person[] = [
  { name: "Alexis", age: 16, isStudent: true },
  { name: "Jane", age: 16, isStudent: false },
  { name: "Isaac", age: 19, isStudent: false },
 ]
  
 let message: string = "Start";

  let score: number = 50;

  if (score >= 60) {
    message = "Pass"
  } else {
    message = "try again"
  }
   let isActive: boolean = false;

   while (isActive) {
    message = "loop"
    isActive = false;
  }
 let loops : number = 0;
 for(; loops < 3;) {
 loops= loops + 1
 }
 //Loop #1 - start --> Loops = 0, 0 < 3 = true, end --> loops = 1
  //Loop #2 - start --> Loops = 1, 1 < 3 = true, end --> loops = 2
  //Loop #3 - start --> Loops = 2, 2 < 3 = true, end --> loops = 3
  //Loop #4 - start --> Loops = 3, 3 < 3 = false, end --> loops = 3
 
  

  let sum: number = Multiply(8,7)

     return (

    <div>

      <div>

        <label>Name: </label>

        <input></input>

      </div>

      <div>

        Hello World

      </div>

    </div>

  )
function Multiply (number1 : number, number2: number) :number {
  return number1 * number2;
 }
  function printScore(parameter: string) :string {
  try {

    let score: number = Number(parameter);

    if (isNaN(score)) {

      throw new Error("Error not a number");
    }
  return printScore("50")
  }
   catch (Error) {
   return "invalid score";
   }
  } 
    return String(Error);
  
  }





  return message
 return people[0].name
}

export default App;

