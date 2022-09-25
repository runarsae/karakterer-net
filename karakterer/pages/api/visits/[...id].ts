import { Course } from '@prisma/client';
import { upsertCourseView } from 'lib/upsertCourseView';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<Course[]>) => {
    if (req.method === 'PUT' && req.query) {
        const { id } = req.query;

        if (id && Array.isArray(id)) {
            const course = id.join('');

            return upsertCourseView(course)
                .then(() => {
                    res.status(200).end();
                })
                .catch(() => {
                    res.status(400).end();
                });
        } else {
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
};

export default handler;
