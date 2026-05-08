const createArrayWithTuple = (param1: string, param2: number) => [
  param1,
  param2,
];
const result = createArrayWithTuple("Wasfia", 14);
console.log(result);

//! Generic with Tuple
const createArrayTupleWithGeneric = <X, Y>(param1: X, param2: Y) => [
  param1,
  param2,
];
const stu1 = createArrayTupleWithGeneric("Wasfia", 57);
const stu2 = createArrayTupleWithGeneric(6, 7);
const stu3 = createArrayTupleWithGeneric(true, { color: "Pink", isNew: true });
console.log(stu1);
console.log(stu2);
console.log(stu3);
