//! Write a function reverseString that takes a string as input and returns the reversed version of that string.

const reverseString = (inputString: string): string => {
  const reversedString = inputString.split("").reverse().join("");
  return reversedString;
};
const result = reverseString("typescript");
console.log(result);
