// Simple-> Step 1
const coordinates1: [number, number] = [20, 35];

// Simple-> Step 2
type TCoordinates = [string, number];
const coordinates2: TCoordinates = ["Wasfia", 317];

//Todo: Generic
type coordinates<X, Y> = [X, Y];
const coordinates3: coordinates<number, number> = [20, 32];
const coordinates4: coordinates<string, number> = ["20", 32];
const coordinates5: coordinates<string, boolean> = ["20", false];
const coordinates6: coordinates<
  string,
  { name: string; age: number; phone?: string; isStudent?: boolean }
> = [
  "20",
  {
    name: "Mehnaz",
    age: 6,
  },
];
console.log(coordinates6); //[ '20', { name: 'Mehnaz', age: 6 } ]
