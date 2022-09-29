import { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

const coursesWithNames = Prisma.validator<Prisma.TopViewArgs>()({
    select: {
        course: true,
        courses: {
            select: {
                name: true
            }
        }
    }
});

/**
 * Get top 8 courses with most views
 * @returns List of objects with course code and name
 */
export async function getMostPopularCoursesByViews() {
    const data = await prisma.topView.findMany({
        orderBy: {
            countSum: 'desc'
        },
        ...coursesWithNames
    });

    return data;
}

export type CoursesWithNames = Prisma.PromiseReturnType<typeof getMostPopularCoursesByViews>;
