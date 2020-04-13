import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import {User} from "../entities/user.entity";
import {Session, SessionStatus} from "../entities/session.entity";
import auth from '../config/auth';

class SessionController {
  async createSession(req: any, res: any) {
    const userRepo = getRepository(User);
    const sessionRepo = getRepository(Session);

    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'An email must be informed', error: 'MISSING_EMAIL' });
    }

    if (!password) {
      return res.status(400).json({ message: 'A password must be informed', error: 'MISSING_PASSWORD' });
    }

    const user = await userRepo.findOne({ where: { email }, select: ['name', 'email', 'password', 'id'] });

    if (!user) {
      return res.status(404).json({ message: 'Incorrect credentials', error: 'WRONG_CREDENTIALS' });
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect credentials', error: 'WRONG_CREDENTIALS' });
    }

    /**
     * if all data has been informed and everything is correct
     * proceed creating the session
     */

    console.log('user -> ', user);
    // generating jwt
    const token = jwt.sign({ data: user }, auth.appSecret, { expiresIn: '1 day' });

    try {
      const createdSession = await sessionRepo.save(new Session({ user, status: SessionStatus.VALID, token }));
      delete user.password;
      return res.status(200).json(createdSession);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
}

export default new SessionController();