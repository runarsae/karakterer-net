import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{ revalidated: boolean } | { message: string } | string>
) => {
    if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate('/');
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
};

export default handler;
