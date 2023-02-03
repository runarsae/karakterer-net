import prisma from 'lib/prisma';

export async function searchCourses(search: string) {
    const data = await prisma.coursesWithGrades.findMany({
        where: {
            OR: [
                {
                    course: {
                        contains: search
                    }
                },
                {
                    name: {
                        contains: search
                    }
                }
            ]
        }
    });

    return data;
}
