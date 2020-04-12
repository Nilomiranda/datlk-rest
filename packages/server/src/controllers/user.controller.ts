import {getRepository} from "typeorm";
import {User} from "../entities/user.entity";

class UserController {
  async getUsers(req: any, res: any) {
    const userRepo = getRepository(User);

    const users = await userRepo.find();
    console.log('users -> ', users);
    res.json(users);
  }
}

export default new UserController();