import prisma from 'lib/prisma';

export async function upsertCourseView(course: string) {
    const now = new Intl.DateTimeFormat('en-GB').format(new Date());

    return prisma.view.upsert({
        where: {
            course_date: {
                course: course,
                date: now
            }
        },
        update: {
            count: {
                increment: 1
            }
        },
        create: {
            course: course,
            date: now,
            count: 1
        }
    });
}
