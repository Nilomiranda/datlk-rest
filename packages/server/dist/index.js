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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// local imports
const routes_1 = __importDefault(require("./routes"));
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
const port = process.env.PORT;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
        };
        yield typeorm_1.createConnection();
        const app = express_1.default();
        app.use(cors_1.default(corsOptions));
        app.use(bodyParser.json());
        app.use('/api', routes_1.default);
        app.listen(port, () => {
            console.log(`Server is running like 🔥🔥🔥 on port ${port}`);
        });
    });
}
startServer();
//# sourceMappingURL=index.js.map