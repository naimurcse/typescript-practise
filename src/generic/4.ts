type TPerson<T, Y = null> = {
  name: string;
  age: number;
  address: string;
  contact: T;
  car?: Y;
};

const person1: TPerson<{ phone: string; email: string }> = {
  name: "Wasfia",
  age: 6,
  address: "Dhaka",
  contact: {
    email: "wasfi@gmail.com",
    phone: "0124",
  },
};

// Clean Coding
type TContact = { phone: string; website: string; whatsup: string };
interface ICar {
  vehical: string;
  price: string;
  model: string;
}
const person2: TPerson<TContact, ICar> = {
  name: "Shazneen",
  age: 6,
  address: "Chittagong",
  contact: {
    website: "wasfi@gmail.com",
    phone: "0124",
    whatsup: "017",
  },
  car: {
    vehical: "bike",
    price: "20000$",
    model: "R15",
  },
};
