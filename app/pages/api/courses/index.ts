import { Course } from '@prisma/client';
import { searchCourses } from 'lib/searchCourses';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<Course[]>) => {
    if (req.method === 'GET') {
        const { search } = req.query;

        if (typeof search === 'string') {
            try {
                const data = await searchCourses(search);

                res.status(200).json(data);
            } catch {
                res.status(400).end();
            }
        } else {
            res.status(400).end();
        }
    }
};

export default handler;
