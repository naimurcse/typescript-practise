const kgToGmConverter = (
  input: number | string,
): number | string | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    const [value] = input.split(" ");
    return Number(value) * 1000;
  }
};

const result1 = kgToGmConverter(15) as number;
console.log(result1);

const result2 = kgToGmConverter("2 KG") as string;
console.log(result2);
