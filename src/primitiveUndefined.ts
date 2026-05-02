// Explicit
let myTheme: undefined = undefined;
console.log(myTheme);
// myTheme="Green" <---- error   শুধুমাত্র undefined value হিসাবে নিবে।

let myBox = undefined; // Type is any in TS
console.log(typeof myBox); // undefined in JS
myBox = 123;
myBox = "Car";
