import express from 'express';
import UserController from './controllers/UserController';
import SessionController from "./controllers/SessionController";

const router = express.Router();


router.post('/user', UserController.createNewUser);
router.get('/user', UserController.getUsers);

router.post('/session', SessionController.createSession);

export default router;