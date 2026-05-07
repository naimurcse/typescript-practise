//! Create a TypeScript function filterEvenNumbers that accepts an array of numbers and returns a new array containing only the even numbers.
// Todo: Normal function
/*
function filterEvenNumbers(arrayOfNumbers: number[]): number[] {
  const evenNumbers = arrayOfNumbers.filter((num) => num % 2 == 0);
  return evenNumbers;
}
*/

// Todo: Arrow function
const filterEvenNumbers = (arrayOfNumbers: number[]): number[] => {
  const evenNumbers = arrayOfNumbers.filter((num) => num % 2 == 0);
  return evenNumbers;
};

const arrayOfEvenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6]);
console.log(arrayOfEvenNumbers);
