const arrayOfNum: number[] = [5, 6, 9];
const arrayOfString: string[] = ["5", "6", "9"];

const arrayOfStringUsingMap: string[] = arrayOfNum.map((x) => x.toString());
console.log(arrayOfStringUsingMap);

//! Mapped Types
type AreaOfNum = {
  height: number;
  width: number;
};

// type height = AreaOfNum["height"];

/*
type AreaOfString = {
    height: string;
    width: string;
};
*/

type Area<T> = {
  //Todo: একবার key টা হবে height আবার হবে width
  //key নামের পরিবর্তে অন্য কিছু ব্যবহার করতে পারি ।
  //   [key in "height" | "width"]: string;
  //   keyof AreaOfNum = 'height' | 'width'
  //   [key in keyof AreaOfNum]: string;
  //   [key in keyof T]: string;
  [key in keyof T]: T[key];
};

const area1: Area<{ height: number; width: number }> = {
  height: 50,
  width: 40,
};
