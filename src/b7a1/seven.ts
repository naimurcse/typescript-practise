//! Create a function getIntersection that takes two arrays of numbers and returns a new array containing only the elements that are present in both arrays.

const getIntersection = (
  firstArray: number[],
  secondArray: number[],
): number[] => {
  return firstArray.filter((num) => secondArray.includes(num));
};

const result = getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);
console.log(result);
