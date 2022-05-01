import { CourseWithGrades } from 'api/course';
import { AllSemesterStats, CourseProps } from 'pages/course/[...id]';
import { computeTotalAverage, computeTotalFailPercentage, semesterLetter } from './grades';

export function transformCourseData(data: CourseWithGrades): CourseProps {
    const grades: AllSemesterStats = data.grades.reduce(
        (obj, item) => ({
            ...obj,
            [semesterLetter(item.semester) + item.year.toString()]: {
                isGraded: item.isGraded,
                students: item.students,
                averageGrade: item.averageGrade,
                failPercentage: item.failPercentage,
                letterGrades: [item.a, item.b, item.c, item.d, item.e, item.f],
                passFailGrades: [item.g, item.h]
            }
        }),
        {}
    );

    const [totalAverage, totalAverageLetter] = computeTotalAverage(data.grades);

    return {
        course: data.course,
        name: data.name,
        hasGrades: Object.values(grades).some((stats) => stats.isGraded),
        hasPassFail: Object.values(grades).some((stats) => !stats.isGraded),
        semesters: Object.keys(grades),
        grades: grades,
        averageGrades: Object.values(grades).map((stats) => stats.averageGrade),
        failPercentages: Object.values(grades).map((stats) => stats.failPercentage),
        totalAverage: totalAverage,
        totalAverageLetter: totalAverageLetter,
        totalFailPercentage: computeTotalFailPercentage(data.grades)
    };
}
