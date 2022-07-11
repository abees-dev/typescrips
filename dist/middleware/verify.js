"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verify = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify = async (req, res, next) => {
    try {
        const BearerToken = req.headers.authorization;
        const accessToken = BearerToken === null || BearerToken === void 0 ? void 0 : BearerToken.split(' ')[1];
        if (!accessToken) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ code: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'Your account is not authenticated' });
        }
        jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, error => {
            if (error) {
                return res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ code: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'Your token is not valid' });
            }
            return next();
        });
        return;
    }
    catch (error) {
        return (error === null || error === void 0 ? void 0 : error.statusCode)
            ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
            : res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
    }
};
exports.verify = verify;
const verifyAdmin = (req, res, next) => {
    try {
        const BearerToken = req.headers.authorization;
        const accessToken = BearerToken === null || BearerToken === void 0 ? void 0 : BearerToken.split(' ')[1];
        if (!accessToken) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ code: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'Your account is not authenticated' });
        }
        const payload = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (payload.role !== 'admin') {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ code: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'You are not authorized to access this data' });
        }
        return next();
    }
    catch (error) {
        return (error === null || error === void 0 ? void 0 : error.statusCode)
            ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
            : res.status(http_status_codes_1.StatusCodes.PROXY_AUTHENTICATION_REQUIRED).json({
                code: http_status_codes_1.StatusCodes.PROXY_AUTHENTICATION_REQUIRED,
                message: error.message,
            });
    }
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=verify.js.map