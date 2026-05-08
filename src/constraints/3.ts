//? keyof operator ব্যবহার করে -> Constraint ব্যবহার
type TVehicles = {
  car: string;
  bike: string;
  ship: string;
  cng: string;
};

type TVehicleWithUnion = "car" | "ship" | "bike" | "cng";
type TVehicleWithKeyof = keyof TVehicles; // "car" | "ship" | "bike" | "cng";

const vehicle1: TVehicleWithKeyof = "car"; //? acceptable
// const vehicle2: TVehicleWithKeyof = "cart"; //! Not-acceptable
const vehicle3: TVehicleWithUnion = "car"; //? acceptable
// const vehicle4: TVehicleWithUnion = "bus"; //! Not-acceptable
