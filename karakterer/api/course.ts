import { Prisma } from '@prisma/client';
import client from 'prisma/client';

const courseWithGrades = Prisma.validator<Prisma.CourseArgs>()({
    include: {
        grades: {
            select: {
                year: true,
                semester: true,
                isGraded: true,
                students: true,
                a: true,
                b: true,
                c: true,
                d: true,
                e: true,
                f: true,
                g: true,
                h: true,
                averageGrade: true,
                failPercentage: true
            }
        }
    }
});

/**
 * Get course data and grades for course
 * @param course Unique course code
 * @returns Course information and grades for course
 */
export async function getCourseData(course: string) {
    const data = await client.course.findUnique({
        where: {
            course: course
        },
        ...courseWithGrades
    });

    return data;
}

export type CourseWithGrades = Prisma.CourseGetPayload<typeof courseWithGrades>;
export type CourseWithGradesPromise = Prisma.PromiseReturnType<typeof getCourseData>;

/**
 * Get top 100 courses with most students for last three spring and autumn semesters
 * @returns List of objects with course code
 */
export async function getMostPopularCourses() {
    const data = await client.grades.findMany({
        where: {
            year: {
                gte: new Date().getFullYear() - 3
            }
        },
        orderBy: {
            students: 'desc'
        },
        select: {
            course: true
        },
        distinct: ['course'],
        take: 100
    });

    return data;
}

export type Courses = Prisma.PromiseReturnType<typeof getMostPopularCourses>;
