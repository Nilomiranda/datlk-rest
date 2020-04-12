"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const router = express_1.default.Router();
router.get('/', user_controller_1.default.getUsers);
router.get('/test', (req, res) => {
    res.send('hello from test route');
});
exports.default = router;
//# sourceMappingURL=routes.js.map