import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
//   const { published } = req.body;
    const result = await prisma.comment.delete({
        where: {
            id: req.query.id,
        }
    });
    res.json(result);
}