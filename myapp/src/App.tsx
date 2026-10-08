function App() {
 let isStudent: boolean = true;
 const name: string = "Alexis";
 let age : number = 16;
 
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
  
 return "HELLO LEXY"
}

class Person {
  name!: string;
  age!: number;
  isStudent!: boolean;
}

export default App;

