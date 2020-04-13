import dotenv from 'dotenv';

dotenv.config();

export default {
  appSecret: process.env.APP_SECRET,
}