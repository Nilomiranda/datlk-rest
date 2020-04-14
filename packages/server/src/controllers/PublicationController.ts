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
    const pubId: number = req.params.id;

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

  async updatePublication(req: any, res: any) {
    const pubRepo = getRepository(Publication);
    const { content } = req.body;
    const pubId: number = req.params.id;

    /**
     * As content is the only thing possible to edit
     * we just make sure a content is passed in body payload
     */
    if (!content) {
      return res.status(400).json({ message: 'Content is missing', error: 'EMPTY_CONTENT' });
    }

    try {
      const publication = await pubRepo.findOne({ where: { id: pubId }, relations: ['user'] });

      if (!publication) {
        return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
      }

      publication.content = content;

      const updatedPublication = await pubRepo.save(publication);

      return res.status(200).json(updatedPublication);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }

  async deletePublication(req: any, res: any) {
    const pubRepo = getRepository(Publication);
    const pubId: number = req.params.id;

    try {
      const publication = await pubRepo.findOne({ where: { id: pubId }, relations: ['user'] });

      if (!publication) {
        return res.status(404).json({ message: 'Publication not found', error: 'PUBLICATION_NOT_FOUND' });
      }

      await pubRepo.delete(publication.id);

      return res.status(200).json({ message: 'Success' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
}

export default new PublicationController();