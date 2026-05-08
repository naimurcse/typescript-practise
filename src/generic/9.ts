const addStudentToCoure = <T>(studentInfo: T) => {
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
const student1: TStudent = {
  id: 54,
  name: "Mr Y",
  hasPen: false,
};
const student2: TStudent = {
  id: 12,
  name: "Mr Z",
};

const result1 = addStudentToCoure(student1);
const result2 = addStudentToCoure(student2);
console.log(result1);
console.log(result2);
