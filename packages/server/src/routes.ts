import express from 'express';
import UserController from './controllers/user.controller';

const router = express.Router();


router.get('/', UserController.getUsers)

router.get('/test', (req, res) => {
  res.send('hello from test route');
})

export default router;