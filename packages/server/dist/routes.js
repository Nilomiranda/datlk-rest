"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const router = express_1.default.Router();
router.post('/user', UserController_1.default.createNewUser);
router.get('/user', UserController_1.default.getUsers);
router.post('/session', SessionController_1.default.createSession);
exports.default = router;
//# sourceMappingURL=routes.js.map