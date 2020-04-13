"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
class UserController {
    createNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            const userRepo = typeorm_1.getRepository(user_entity_1.User);
            if (!email) {
                return res.status(400).json({ message: 'An email must be informed', error: 'MISSING_EMAIL' });
            }
            if (!password) {
                return res.status(400).json({ message: 'Password must be informed', error: 'MISSING_PASSWORD' });
            }
            if (!name) {
                return res.status(400).json({ message: 'A name must be informed', error: 'MISSING_NAME' });
            }
            // email must be unique
            const user = yield userRepo.findOne({ where: { email } });
            if (user) {
                return res.status(409).json({ message: 'Email is already in use', error: 'EMAIL_MUST_BE_UNIQUE' });
            }
            const hashedPassword = yield bcrypt.hash(password, 8);
            try {
                const createdUser = yield userRepo.save(new user_entity_1.User({ email, password: hashedPassword, name }));
                delete createdUser.password;
                return res.status(200).json(createdUser);
            }
            catch (err) {
                return res.status(500).json({ message: 'Server error', error: err.message });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(user_entity_1.User);
            const users = yield userRepo.find();
            console.log('users -> ', users);
            res.json(users);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map