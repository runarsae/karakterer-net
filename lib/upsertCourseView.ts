import prisma from 'lib/prisma';

export async function upsertCourseView(course: string) {
    return prisma.$executeRaw`
        INSERT INTO views (course, date, count) 
        VALUES (${course}, CURRENT_DATE, 1) 
        ON DUPLICATE KEY UPDATE count = count + 1;
    `;
}
