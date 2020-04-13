"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const router = express_1.default.Router();
router.post('/user', user_controller_1.default.createNewUser);
router.get('/', user_controller_1.default.getUsers);
exports.default = router;
//# sourceMappingURL=routes.js.map