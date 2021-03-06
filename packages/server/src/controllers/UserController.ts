import {getRepository} from "typeorm";
import {User} from "../entities/User";
import * as bcrypt from 'bcrypt';


export default {
  async createNewUser(req: any, res: any) {
    const { email, password, name } = req.body;
    const userRepo = getRepository(User);

    if (!email) {
      return res.status(400).json({ message: 'An email must be informed', error: 'MISSING_EMAIL' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password must be informed', error: 'MISSING_PASSWORD' });
    }

    if (!name) {
      return res.status(400).json({ message: 'A name must be informed', error: 'MISSING_NAME' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must contain at least 8 characters', error: 'SHORT_PASSWORD' });
    }

    // email must be unique
    const user = await userRepo.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ message: 'Email is already in use', error: 'EMAIL_MUST_BE_UNIQUE' })
    }

    const hashedPassword: string = await bcrypt.hash(password, 8);

    try {
      const createdUser = await userRepo.save(new User({ email, password: hashedPassword, name }));
      /**
       * we delete password prop here to avoid
       * this field to be exposed in the request response
       * In entity definition, { select: false } only
       * works when you're directly querying for the information
       */
      delete createdUser.password;
      return res.status(200).json(createdUser);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  async getUsers(req: any, res: any) {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    res.json(users);
  }
}
