import express from 'express';
import UserController from './controllers/UserController';
import SessionController from "./controllers/SessionController";
import validateSession from "./middlewares/authMiddleware";
import PublicationController from "./controllers/PublicationController";

const router = express.Router();


router.post('/user', UserController.createNewUser);

router.post('/session', SessionController.createSession);

router.use(validateSession);

// protected routes
router.get('/user', UserController.getUsers);

router.delete('/session', SessionController.destroySession);

router.get('/publication', PublicationController.getPublications);
router.get('/publication/:id', PublicationController.getOnePublication);
router.post('/publication', PublicationController.createPublication);
router.patch('/publication/:id', PublicationController.updatePublication);
router.delete('/publication/:id', PublicationController.deletePublication);

export default router;