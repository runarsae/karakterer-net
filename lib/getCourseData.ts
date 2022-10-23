import { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

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
    const data = await prisma.course.findUnique({
        where: {
            course: course
        },
        ...courseWithGrades
    });

    return data;
}

export type CourseWithGrades = Prisma.CourseGetPayload<typeof courseWithGrades>;
export type CourseWithGradesPromise = Prisma.PromiseReturnType<typeof getCourseData>;
