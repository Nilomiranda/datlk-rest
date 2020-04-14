"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const publication_entity_1 = require("../entities/publication.entity");
const comment_entity_1 = require("../entities/comment.entity");
class CommentsController {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            const commentRepo = typeorm_1.getRepository(comment_entity_1.Comment);
            const { content } = req.body;
            const { user } = req;
            const { publicationId } = req.params;
            if (!content) {
                return res.status(400).json({ message: 'Content cannot be empty', error: 'MISSING_CONTENT' });
            }
            try {
                const publication = yield pubRepo.findOne(publicationId);
                if (!publication) {
                    return res.status(404).json({ message: 'Publicaton not found', error: 'PUBLICATION_NOT_FOUND' });
                }
                const comment = yield commentRepo.save(new comment_entity_1.Comment({ content, user, publication }));
                return res.status(200).json(comment);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentRepo = typeorm_1.getRepository(comment_entity_1.Comment);
            const { publicationId } = req.params;
            try {
                const comments = yield commentRepo.find({ where: { publication: { id: publicationId } }, relations: ['user'] });
                return res.status(200).json(comments);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentRepo = typeorm_1.getRepository(comment_entity_1.Comment);
            const { content } = req.body;
            const { user } = req;
            const { id: commentId } = req.params;
            if (!content) {
                return res.status(400).json({ message: 'No content', error: 'CONTENT_MISSING' });
            }
            try {
                const comment = yield commentRepo.findOne(commentId, { relations: ['user'] });
                delete comment.user.password;
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found', error: 'COMMENT_NOT_FOUND' });
                }
                if (comment.user.id !== user.id) {
                    return res.status(403).json({ message: 'User does not own this comment', error: 'COMMENT_NOT_OWNED' });
                }
                comment.content = content;
                const updatedComment = yield commentRepo.save(comment);
                return res.status(200).json(updatedComment);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    destroyComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentRepo = typeorm_1.getRepository(comment_entity_1.Comment);
            const { user } = req;
            const { id: commentId } = req.params;
            try {
                const comment = yield commentRepo.findOne(commentId, { relations: ['user'] });
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found', error: 'COMMENT_NOT_FOUND' });
                }
                if (comment.user.id !== user.id) {
                    return res.status(403).json({ message: 'User does not own this comment', error: 'COMMENT_NOT_OWNED' });
                }
                yield commentRepo.delete(commentId);
                return res.status(200).json({ message: 'Success' });
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
}
exports.default = new CommentsController();
//# sourceMappingURL=CommentController.js.map