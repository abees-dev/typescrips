"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = exports.login = exports.regiser = void 0;
const argon2_1 = __importDefault(require("argon2"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const User_1 = __importDefault(require("../models/User"));
const errors_1 = require("../shared/errors");
const regiser = async (user) => {
    const { email, password } = user;
    if (!email || !password) {
        throw new errors_1.ParamMissingError('Missing email or password');
    }
    const existingUser = await User_1.default.findByEmail(email);
    if (existingUser) {
        throw new errors_1.UserConflictError();
    }
    const passwordHash = await argon2_1.default.hash(password);
    const newUser = new User_1.default({
        email,
        password: passwordHash,
    });
    await newUser.save();
    const _a = newUser._doc, { password: newPass } = _a, other = __rest(_a, ["password"]);
    return other;
};
exports.regiser = regiser;
const login = async (user) => {
    const { email, password } = user;
    const existingUser = await User_1.default.findByEmail(email);
    if (!email || !password) {
        throw new errors_1.ParamMissingError('Missing email or password');
    }
    if (!existingUser) {
        throw new errors_1.UnauthorizedError('Incorrect email or password');
    }
    const isValidPassword = await argon2_1.default.verify(existingUser.password, password);
    if (!isValidPassword) {
        throw new errors_1.UnauthorizedError('Incorrect email or password');
    }
    const _a = existingUser._doc, { password: newPass } = _a, other = __rest(_a, ["password"]);
    return other;
};
exports.login = login;
const setToken = async (token, userId) => {
    const refreshToken = await RefreshToken_1.default.findOne({ userId });
    if (!refreshToken) {
        const newFreshToken = new RefreshToken_1.default({
            userId,
            refreshToken: token,
        });
        await newFreshToken.save();
    }
    else {
        await RefreshToken_1.default.findOneAndUpdate({ userId }, {
            refreshToken: token,
        });
    }
};
exports.setToken = setToken;
//# sourceMappingURL=authService.js.map