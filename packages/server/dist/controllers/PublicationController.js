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
class PublicationController {
    createPublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            const { content } = req.body;
            const { user } = req;
            if (!content) {
                return res.status(400).json({ message: 'Content is missing', error: 'EMPTY_CONTENT' });
            }
            try {
                const publication = yield pubRepo.save(new publication_entity_1.Publication({ content, user }));
                return res.status(200).json(publication);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    getPublications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            try {
                const publications = yield pubRepo.find({ relations: ['user', 'comments', 'comments.user'], order: { id: 'DESC' } });
                return res.status(200).json(publications);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    getOnePublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            const pubId = req.params.id;
            try {
                const publication = yield pubRepo.findOne({ where: { id: pubId }, relations: ['user', 'comments', 'comments.user'] });
                if (!publication) {
                    return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
                }
                return res.status(200).json(publication);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    updatePublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            const { content } = req.body;
            const { user } = req;
            const pubId = req.params.id;
            /**
             * As content is the only thing possible to edit
             * we just make sure a content is passed in body payload
             */
            if (!content) {
                return res.status(400).json({ message: 'Content is missing', error: 'EMPTY_CONTENT' });
            }
            try {
                const publication = yield pubRepo.findOne({ where: { id: pubId }, relations: ['user'] });
                if (!publication) {
                    return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
                }
                if (publication.user.id !== user.id) {
                    return res.status(403).json({ message: 'User do not own publication', error: 'CANNOT_DELETE_OTHERS_POST' });
                }
                publication.content = content;
                const updatedPublication = yield pubRepo.save(publication);
                return res.status(200).json(updatedPublication);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
    deletePublication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pubRepo = typeorm_1.getRepository(publication_entity_1.Publication);
            const pubId = req.params.id;
            const { user } = req;
            try {
                const publication = yield pubRepo.findOne({ where: { id: pubId }, relations: ['user'] });
                if (!publication) {
                    return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
                }
                if (publication.user.id !== user.id) {
                    return res.status(403).json({ message: 'User do not own publication', error: 'CANNOT_DELETE_OTHERS_POST' });
                }
                yield pubRepo.delete(publication.id);
                return res.status(200).json({ message: 'Success' });
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
}
exports.default = new PublicationController();
//# sourceMappingURL=PublicationController.js.map