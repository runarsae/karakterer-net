import { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

/**
 * Get top 100 courses with most students for last three spring and autumn semesters
 * @returns List of objects with course code
 */
export async function getMostPopularCoursesByStudents() {
    const data = await prisma.grades.findMany({
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

export type Courses = Prisma.PromiseReturnType<typeof getMostPopularCoursesByStudents>;
