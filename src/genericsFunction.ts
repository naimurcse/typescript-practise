const createArrayWithObject = (value: { id: number; name: string }) => [value];

const result = createArrayWithObject({ id: 125, name: "Don" });
console.log(result);

const createGenericsArray = <T>(value: T) => [value];
const arrString = createGenericsArray("Wasfia");
console.log(arrString);
const arrNumber = createGenericsArray(317);
console.log(arrNumber);
const arrObject = createGenericsArray({ id: 317, name: "MS" });
console.log(arrObject);

const createArrayWithTuple = (param1: string, param2: string) => [
  param1,
  param2,
];

const arrTuple = createArrayWithTuple("Mehnaz", "Shazneen");
console.log(arrTuple);

const createArrayTupleWithGeneric = <X, Y>(param1: X, param2: Y) => [
  param1,
  param2,
];

const result2 = createArrayTupleWithGeneric("Wasfia", 317);
console.log(result2);
