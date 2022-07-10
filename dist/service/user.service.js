"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regiser = void 0;
const errors_1 = require("../shared/errors");
const User_1 = __importDefault(require("../models/User"));
const argon2_1 = __importDefault(require("argon2"));
const regiser = async (user) => {
    const { email, password } = user;
    if (!email || !password) {
        throw new errors_1.ParamMissingError();
    }
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw new errors_1.UserConflictError();
    }
    const passwordHash = await argon2_1.default.hash(password);
    const newUser = new User_1.default({
        email,
        password: passwordHash,
    });
    await newUser.save();
    return newUser;
};
exports.regiser = regiser;
//# sourceMappingURL=user.service.js.map