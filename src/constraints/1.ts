const addStudentToCourse = <
  T extends {
    id: number;
    name: string;
  },
>(
  studentInfo: T,
) => {
  return {
    course: "Next Level",
    ...studentInfo,
  };
};

const result1 = addStudentToCourse({
  id: 12,
  name: "Mr Z",
});

console.log(result1);

// Clean Coding
const student2 = {
  id: 54,
  name: "Mr Y",
  hasPen: false,
  hasBike: false,
  address: {
    city: "Dhaka",
    country: "Bangladesh",
  },
};
const result2 = addStudentToCourse(student2);
console.log(result2);
