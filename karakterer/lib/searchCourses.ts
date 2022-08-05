import client from 'prisma/client';

export async function searchCourses(search: string) {
    const data = await client.coursesWithGrades.findMany({
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
