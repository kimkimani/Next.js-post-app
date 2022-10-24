
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { title, content,published } = req.body;
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published
      },
    });
    res.json(result);
}