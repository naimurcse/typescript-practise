//! Utility Types

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  color?: string;
};

//Todo: যখন Product type থেকে আমারদের কিছু কিছু Property দরকার
type ProductSummery = Pick<Product, "id" | "name" | "price">;

//Todo: যখন Product type থেকে আমারদের কিছু কিছু Property বাদ দিয়ে অন্যান্য সকাল Property দরকার
type ProductWithOutStock = Omit<Product, "stock" | "color">;

//Todo: যখন Product type এর সকল Property Must থাকতে হবে ।
type ProductWithColor = Required<Product>;

//Todo: যখন Product type এর সকল Property অপশনাল হবে ।
type OptionalProduct = Partial<Product>;

//Todo: যখন Product type এর সকল Property Readonly হয়ে যাবে ।
type ProductReadonly = Readonly<Product>;

//Todo: যখন কোন empty object declear করতে হয় তখন বলে দিতে পারি key হচ্ছে string এবং value গুলো unknown ।
const emptyObj: Record<string, unknown> = {};

const product1: ProductWithColor = {
  id: 125,
  name: "Camera",
  price: "52000",
  stock: 30,
  color: "Black",
};

/*
type ProductSummery = {
    id: number;
    name: string;
    price: string;
};
*/
