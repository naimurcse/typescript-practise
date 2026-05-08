const createArrayFromString = (value: string): [string] => [value];
const createArrayFromNumber = (value: number): [number] => [value];
const createArrayFromObject = (value: { id: number; name: string }): [{}] => [
  value,
];

const result1 = createArrayFromString("Wasfia");
const result2 = createArrayFromNumber(317);
const result3 = createArrayFromObject({ id: 317, name: "Wasfia" });
console.log(result1);
console.log(result2);
console.log(result3);
console.log("--------------------------------------------");

//! Generics with function

const createArray = <T>(value: T) => [value];
const arrayString = createArray("Wasfia");
const arrayNumber = createArray(317);
const arrayObject = createArray({ id: 12, name: "Shazneen" });
console.log(arrayString);
console.log(arrayNumber);
console.log(arrayObject);
