interface Product {
  price: number;
  color: string;
  isNew: boolean;
  isWaterProof?: boolean; //Optional
}

type Optional<T> = {
  [K in keyof T]?: T[K];
};
type Required<T> = {
  [K in keyof T]-?: T[K];
};
type Absolute<T> = {
  readonly [K in keyof T]: T[K];
};
type Stringify<T> = {
  [K in keyof T]: string;
};

const product1: Optional<Product> = {};
const product2: Required<Product> = {
  price: 5800,
  color: "black",
  isNew: true,
  isWaterProof: false,
};
product2.color = "blue";
console.log(`Now product2 color is : ${product2.color}`);

const product3: Absolute<Product> = {
  price: 856,
  color: "red",
  isNew: false,
};

const product4: Stringify<Product> = {
  price: "854",
  color: "blue",
  isNew: "true",
  isWaterProof: "false",
};
// product3.color = "white"; //! error --- readonly
