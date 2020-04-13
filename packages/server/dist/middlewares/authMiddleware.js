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
const jwt = __importStar(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const typeorm_1 = require("typeorm");
const session_entity_1 = require("../entities/session.entity");
// @ts-ignore
function validateSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
        }
        const [tokenType, token] = authorization.split(' ');
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
        const decoded = jwt.verify(token, auth_1.default.appSecret, { ignoreExpiration: false, maxAge: '1 day' });
        const persistedSession = yield checkIfTokenIsValid(token);
        if (!persistedSession.valid) {
            return res.status(401).json({ message: 'User must be logged in', error: 'UNAUTHORIZED' });
        }
        req.user = decoded.user;
        req.sessionId = persistedSession.id;
        return next();
    });
}
/**
 * This will make sure user is not using a token which is not valid
 * E.g. -> A user logged out of our application before his token expires
 * so he won't be able to use it again
 */
function checkIfTokenIsValid(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionRepo = typeorm_1.getRepository(session_entity_1.Session);
        const session = yield sessionRepo.findOne({ where: { token } });
        if (!session) {
            return { valid: false };
        }
        if (session.status === session_entity_1.SessionStatus.INVALID) {
            return { valid: false };
        }
        else {
            return { valid: true, id: session.id };
        }
    });
}
exports.default = validateSession;
//# sourceMappingURL=authMiddleware.js.map