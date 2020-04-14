import {getRepository} from "typeorm";
import {Publication} from "../entities/publication.entity";

class PublicationController {
  async createPublication(req: any, res: any) {
    const pubRepo = getRepository(Publication);

    const { content } = req.body;
    const { user } = req;

    if (!content) {
      return res.status(400).json({ message: 'Content is missing', error: 'EMPTY_CONTENT' });
    }

    try {
      const publication = await pubRepo.save(new Publication({ content, user }));

      return res.status(200).json(publication);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }

  async getPublications(req: any, res: any) {
    const pubRepo = getRepository(Publication);

    try {
      const publications = await pubRepo.find({ relations: ['user'] });
      return res.status(200).json(publications);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }

  async getOnePublication(req: any, res: any) {
    const pubRepo = getRepository(Publication);
    const pubId = req.params.id;

    try {
      const publication = await pubRepo.findOne({ where: { id: pubId }, relations: ['user'] });
      if (!publication) {
        return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
      }

      return res.status(200).json(publication);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
}

export default new PublicationController();