import { getRepository } from "typeorm";
import { Publication } from "src/entities/publication.entity";
import { Comment } from "src/entities/comment.entity";

class CommentController {
  async createComment(req: any, res: any) {
    const pubRepo = getRepository(Publication);
    const commentRepo = getRepository(Comment);

    const { content } = req.body;
    const { user } = req;
    const { publicationId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'Content cannot be empty', error: 'MISSING_CONTENT' })
    }

    try {
      const publication = await pubRepo.findOne(publicationId)

      if (!publication) {
        return res.status(404).json({ message: 'Publicaton not found', error: 'PUBLICATION_NOT_FOUND' });
      }

      const comment = await commentRepo.save(new Comment({ content, user }));

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

  }
}

export default new CommentController();