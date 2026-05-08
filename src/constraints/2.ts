const addStudentToCourse = <T extends TStudent>(studentInfo: T) => {
  return {
    course: "Next Level",
    ...studentInfo,
  };
};

type TStudent = {
  id: number;
  name: string;
  hasPen?: boolean;
};
const student1 = {
  id: 54,
  name: "Mr Y",
  hasPen: false,
};
const student2 = {
  id: 12,
  name: "Mr Z",
};

const result1 = addStudentToCourse(student1);
const result2 = addStudentToCourse(student2);
console.log(result1);
console.log(result2);
