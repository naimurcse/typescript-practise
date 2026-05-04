// type define
type User = {
  id: number;
  name: string;
  address: {
    city: string;
  };
};

// user object
const user: User = {
  id: 317,
  name: "Wasfia",
  address: {
    city: "Dinajpur",
  },
};

// Get Property From Object: user
// const getPropertyFromObject = (obj: User, key: "id" | "name" | "address") =>
const getPropertyFromObject = (obj: User, key: keyof User) => obj[key];

const user1 = getPropertyFromObject(user, "name");
console.log(user1);

// Get Property From Any Object
const student = {
  id: 123,
  class: "four",
};
const product = {
  brand: "HP",
  price: 31000,
};
const getPropertyFromAnyObject = <X>(obj: X, key: keyof X) => obj[key];
const product1 = getPropertyFromAnyObject(product, "price");
console.log(product1);
// const user2 = getPropertyFromAnyObject(user, "brand"); <----- error
const user2 = getPropertyFromAnyObject(user, "id");
console.log(user2);

const student1 = getPropertyFromAnyObject(student, "class");
console.log(student1);
