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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Session_1 = require("../entities/Session");
const auth_1 = __importDefault(require("../config/auth"));
exports.default = {
    createSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(User_1.User);
            const sessionRepo = typeorm_1.getRepository(Session_1.Session);
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'An email must be informed', error: 'MISSING_EMAIL' });
            }
            if (!password) {
                return res.status(400).json({ message: 'A password must be informed', error: 'MISSING_PASSWORD' });
            }
            const user = yield userRepo.findOne({ where: { email }, select: ['name', 'email', 'password', 'id'] });
            if (!user) {
                return res.status(404).json({ message: 'Incorrect credentials', error: 'WRONG_CREDENTIALS' });
            }
            const isPasswordCorrect = yield bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Incorrect credentials', error: 'WRONG_CREDENTIALS' });
            }
            delete user.password;
            /**
             * if all data has been informed and everything is correct
             * proceed creating the session
             */
            // generating jwt
            const token = jwt.sign({ user }, auth_1.default.appSecret, { expiresIn: '1 day' });
            try {
                const createdSession = yield sessionRepo.save(new Session_1.Session({ user, status: Session_1.SessionStatus.VALID, token }));
                return res.status(200).json(createdSession);
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    },
    destroySession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionRepo = typeorm_1.getRepository(Session_1.Session);
            // const { email } = req.body;
            const { sessionId } = req;
            const session = yield sessionRepo.findOne({ where: { id: sessionId } });
            if (!session) {
                return res.status(404).json({ message: 'Session not found', error: 'SESSION_NOT_FOUND' });
            }
            // session.status = SessionStatus.INVALID;
            try {
                yield sessionRepo.delete(session.id);
                return res.status(200).json({ message: 'Success' });
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });
    }
};
//# sourceMappingURL=SessionController.js.map