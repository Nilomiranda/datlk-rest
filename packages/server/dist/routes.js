"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const PublicationController_1 = __importDefault(require("./controllers/PublicationController"));
const CommentController_1 = __importDefault(require("./controllers/CommentController"));
const router = express_1.default.Router();
router.post('/user', UserController_1.default.createNewUser);
router.post('/session', SessionController_1.default.createSession);
router.use(authMiddleware_1.default);
// protected routes
router.get('/user', UserController_1.default.getUsers);
router.delete('/session', SessionController_1.default.destroySession);
// PUBLICATIONS
router.get('/publication', PublicationController_1.default.getPublications);
router.get('/publication/:id', PublicationController_1.default.getOnePublication);
router.post('/publication', PublicationController_1.default.createPublication);
router.patch('/publication/:id', PublicationController_1.default.updatePublication);
router.delete('/publication/:id', PublicationController_1.default.deletePublication);
// COMMENTS
router.post('/comments/:publicationId', CommentController_1.default.createComment);
router.patch('/comments/:id', CommentController_1.default.updateComment);
router.get('/comments/:publicationId', CommentController_1.default.getComments);
router.delete('/comments/:id', CommentController_1.default.destroyComment);
exports.default = router;
//# sourceMappingURL=routes.js.map