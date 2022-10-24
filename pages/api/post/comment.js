
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { comment,postId } = req.body;
    const result = await prisma.comment.create({
      data: {
        content: comment,
        postId: postId
      },
    });
    res.json(result);
}