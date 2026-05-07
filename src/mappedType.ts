const arrayOfNumber: number[] = [1, 5, 6];
const arrayOfString: string[] = ["1", "5", "6"];

const arrayOfStringUsingMap: string[] = arrayOfNumber.map((num) =>
  num.toString(),
);
console.log(arrayOfStringUsingMap);
