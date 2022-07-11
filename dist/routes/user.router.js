"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importStar(require("multer"));
const userService_1 = require("../service/userService");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: (0, multer_1.diskStorage)({}) });
router.post('/create', upload.single('files'), async (req, res) => {
    var _a;
    try {
        const body = req.body;
        const files = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const useInfo = await (0, userService_1.createAndUpdate)(body, files);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Update UserInfo successfully',
            data: useInfo,
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
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const users = await User_1.default.getUserByIdPopulate(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ code: http_status_codes_1.StatusCodes.OK, users });
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
exports.default = router;
//# sourceMappingURL=user.router.js.map