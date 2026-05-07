//! Define a union type StringOrNumber and create a function checkType that uses type guards to return "String" if the input is a string or "Number" if the input is a number.

type StringOrNumber = string | number;
const checkType = (x: StringOrNumber): string => {
  if (typeof x === "string") {
    return "String";
  } else if (typeof x === "number") {
    return "Number";
  } else {
    return "Wrong Input!";
  }
};

const result = checkType(55);
console.log(result);
