import express from 'express';
import UserController from './controllers/UserController';
import SessionController from "./controllers/SessionController";
import validateSession from "./middlewares/authMiddleware";

const router = express.Router();


router.post('/user', UserController.createNewUser);

router.post('/session', SessionController.createSession);

router.use(validateSession);

// protected routes
router.get('/user', UserController.getUsers);

router.delete('/session', SessionController.destroySession);


export default router;