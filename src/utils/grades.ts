import { Grade } from "@prisma/client";

export const semesterLetter = (number: number) => {
  switch (number) {
    case 1:
      return "V";
    case 3:
      return "H";
    default:
      return "";
  }
};

export const gradeLetter = (number: number) => {
  switch (Math.round(number)) {
    case 0:
      return "F";
    case 1:
      return "E";
    case 2:
      return "D";
    case 3:
      return "C";
    case 4:
      return "B";
    case 5:
      return "A";
    default:
      return "";
  }
};

export const computeTotalAverage = (grades: Grade[]) => {
  let gradeSum = 0;
  let students = 0;

  for (let i = 0; i < grades.length; i++) {
    const semesterGrades = grades[i];

    if (
      (semesterGrades.a || semesterGrades.a === 0) &&
      (semesterGrades.b || semesterGrades.b === 0) &&
      (semesterGrades.c || semesterGrades.c === 0) &&
      (semesterGrades.d || semesterGrades.d === 0) &&
      (semesterGrades.e || semesterGrades.e === 0) &&
      semesterGrades.students
    ) {
      gradeSum +=
        semesterGrades.a * 5 +
        semesterGrades.b * 4 +
        semesterGrades.c * 3 +
        semesterGrades.d * 2 +
        semesterGrades.e;
      students += semesterGrades.students;
    }
  }

  if (gradeSum == 0 && students == 0) {
    return null;
  }

  const totalAverage = gradeSum / students;

  return +totalAverage.toFixed(2);
};

export const computeTotalFailPercentage = (grades: Grade[]) => {
  let failedStudents = 0;
  let students = 0;

  for (let i = 0; i < grades.length; i++) {
    const semesterGrades = grades[i];

    if (semesterGrades.isGraded) {
      if (
        (semesterGrades.f || semesterGrades.f === 0) &&
        semesterGrades.students
      ) {
        failedStudents += semesterGrades.f;
        students += semesterGrades.students;
      }
    } else {
      if (
        (semesterGrades.h || semesterGrades.h === 0) &&
        semesterGrades.students
      ) {
        failedStudents += semesterGrades.h;
        students += semesterGrades.students;
      }
    }
  }

  return +((failedStudents / students) * 100).toFixed(1);
};
