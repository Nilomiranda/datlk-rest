import { getRepository } from "typeorm";
import { Publication } from "../entities/Publication";
import { Comment } from "../entities/Comment";
import {User} from "../entities/User";

export default {
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

      const comment = await commentRepo.save(new Comment({ content, user, publication }));

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  async getComments(req: any, res: any) {
    const commentRepo = getRepository(Comment);
    const { publicationId } = req.params;

    try {
      const comments = await commentRepo.find({ where: { publication: { id: publicationId } }, relations: ['user'] });

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  async updateComment(req: any, res: any) {
    const commentRepo = getRepository(Comment);
    const { content } = req.body;
    const { user }: { user: User } = req;
    const { id: commentId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'No content', error: 'CONTENT_MISSING' });
    }

    try {
      const comment = await commentRepo.findOne(commentId, { relations: ['user'] });

      delete comment.user.password;

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found', error: 'COMMENT_NOT_FOUND' });
      }

      if (comment.user.id !== user.id) {
        return res.status(403).json({ message: 'User does not own this comment', error: 'COMMENT_NOT_OWNED' });
      }

      comment.content = content

      const updatedComment = await commentRepo.save(comment);

      return res.status(200).json(updatedComment);

    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  async destroyComment(req: any, res: any) {
    const commentRepo = getRepository(Comment);
    const { user }: { user: User } = req;
    const { id: commentId } = req.params;

    try {
      const comment = await commentRepo.findOne(commentId, { relations: ['user'] });

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found', error: 'COMMENT_NOT_FOUND' });
      }

      if (comment.user.id !== user.id) {
        return res.status(403).json({ message: 'User does not own this comment', error: 'COMMENT_NOT_OWNED' });
      }

      await commentRepo.delete(commentId);

      return res.status(200).json({ message: 'Success' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
}
