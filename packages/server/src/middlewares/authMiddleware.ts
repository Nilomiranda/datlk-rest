import * as jwt from 'jsonwebtoken';
import auth from '../config/auth';
import {getRepository} from "typeorm";
import {Session, SessionStatus} from "../entities/Session";

// @ts-ignore
async function validateSession(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
  }

  const [tokenType, token] = authorization.split(' ');
  console.log(tokenType);
  console.log(token);
  // Only Bearer token is accepted
  if (!tokenType && tokenType !== 'Bearer') {
    return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
  }

  if (!token) {
    return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
  }

  /**
   * After basic validation passed through
   * auth headers we validate the informed token
   */
  try {
    const decoded = jwt.verify(token, auth.appSecret, { ignoreExpiration: false, maxAge: '1 day' });

    const persistedSession = await checkIfTokenIsValid(token);

    if (!persistedSession.valid) {
      return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
    }

    req.user = (decoded as any).user;
    req.sessionId = persistedSession.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'You session expired', error: 'EXPIRED_SESSION' });
  }
}

/**
 * This will make sure user is not using a token which is not valid
 * E.g. -> A user logged out of our application before his token expires
 * so he won't be able to use it again
 */
async function checkIfTokenIsValid(token: string): Promise<{ valid: boolean, id?: number }> {
  const sessionRepo = getRepository(Session);

  const session = await sessionRepo.findOne({ where: { token } });

  if (!session) {
    return { valid: false };
  }

  if (session.status === SessionStatus.INVALID) {
    return { valid: false };
  } else {
    return { valid: true, id: session.id };
  }
}

export default validateSession;
