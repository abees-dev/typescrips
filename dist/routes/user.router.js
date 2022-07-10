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
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("./../utils/authentication");
const http_status_codes_1 = require("http-status-codes");
const express_1 = require("express");
const userService_1 = require("../service/userService");
const authentication_2 = require("../utils/authentication");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const user = await (0, userService_1.regiser)(body);
        const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Register successful',
            user: other,
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json({ code: error.statusCode, message: error.message });
    }
});
userRouter.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await (0, userService_1.login)(body);
        const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
        const accessToken = (0, authentication_2.generateAccessToken)(user);
        const refreshToken = (0, authentication_1.generateRefreshToken)(user);
        (0, authentication_1.sendCookie)(res, refreshToken);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Login successfully',
            user: other,
            accessToken,
        });
    }
    catch (error) {
        return (error === null || error === void 0 ? void 0 : error.statusCode)
            ? res
                .status(error.statusCode)
                .json({ code: error.statusCode, message: error.message })
            : res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map