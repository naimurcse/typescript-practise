//! Write a generic function getProperty that takes an object and a key, then returns the value of that key. Use constraints to ensure the key exists on the object.

// type User = { id: number; name: string; age: number };

// const getProperty = <T extends User, X>(userInfo: T, specificInfo: X) => {
//   return userInfo[specificInfo];
// };

// Todo K নামক টাইপটি অবশ্যই T অবজেক্টের যেকোনো একটি কি (key) হতে হবে।
const getProperty = <T, K extends keyof T>(userInfo: T, specificInfo: K) => {
  return userInfo[specificInfo];
};

const user = { id: 1, name: "John Doe", age: 21 };
const result = getProperty(user, "name");
console.log(result);
