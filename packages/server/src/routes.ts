import express from 'express';
import UserController from './controllers/user.controller';

const router = express.Router();


router.post('/user', UserController.createNewUser);
router.get('/', UserController.getUsers);

export default router;