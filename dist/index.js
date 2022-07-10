"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const dbConnect_1 = require("./config/dbConnect");
const api_1 = __importDefault(require("./routes/api"));
const main = async () => {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const PORT = process.env.PORT || 3080;
    await (0, dbConnect_1.dbConnect)();
    app.use('/api', api_1.default);
    app.listen(PORT, () => console.log(`Serving on port ${PORT}: http://localhost:${PORT}`));
};
main().catch((err) => {
    throw new Error(err.message);
});
//# sourceMappingURL=index.js.map