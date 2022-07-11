"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authService_1 = require("../service/authService");
const authentication_1 = require("../utils/authentication");
const authentication_2 = require("./../utils/authentication");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const user = await (0, authService_1.regiser)(body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            code: http_status_codes_1.StatusCodes.CREATED,
            message: 'Register successful',
            user,
        });
    }
    catch (error) {
        return res.status(error.statusCode).json({ code: error.statusCode, message: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await (0, authService_1.login)(body);
        const accessToken = (0, authentication_1.generateAccessToken)(user);
        const refreshToken = (0, authentication_2.generateRefreshToken)(user);
        (0, authService_1.setToken)(refreshToken, user._id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Login successfully',
            user,
            accessToken,
        });
    }
    catch (error) {
        return (error === null || error === void 0 ? void 0 : error.statusCode)
            ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
            : res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
    }
});
router.post('/refresh-token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                code: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: 'You are not authenticated',
            });
        const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const existingUser = await User_1.default.findById(payload.userId);
        if (!existingUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ code: http_status_codes_1.StatusCodes.NOT_FOUND, message: 'User Not Found' });
        const newRefreshToken = (0, authentication_2.generateRefreshToken)(existingUser);
        const newAccessToken = (0, authentication_1.generateAccessToken)(existingUser);
        (0, authService_1.setToken)(newRefreshToken, payload.userId);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Refresh token',
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map