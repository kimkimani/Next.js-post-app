import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { published } = req.body;
    const result = await prisma.comment.update({
        where: {
            id: req.query.id,
          },
          data: {
            published: published,
          }
    });
    res.json(result);
}