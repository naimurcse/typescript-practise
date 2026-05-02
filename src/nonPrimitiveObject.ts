//Non Primitive = Reference Type = Object
//! Implicit
const student = {
  firstName: "Mehnaz", //TODO: firstName: string
  lastName: "Shazneen", //TODO: lastName: string
};

//! Explicit
const user: {
  firstName: string;
  middleName?: string; //TODO: ? হচ্ছে Optional Type
  lastName: string;
  school: "ABC School"; // Literal Type
} = {
  firstName: "Mehnaz",
  lastName: "Shazneen",
  school: "ABC School",
};

console.log(student);
console.log(user);
