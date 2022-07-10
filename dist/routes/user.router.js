"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const userService_1 = require("../service/userService");
const router = (0, express_1.Router)();
router.post('/create', async (req, res) => {
    try {
        const body = req.body;
        const useInfo = await (0, userService_1.createAndUpdate)(body);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            message: 'Update UserInfo successfully',
            data: useInfo,
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
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('router.get :: id', id);
        const users = await User_1.default.getUserByIdPopulate(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ code: http_status_codes_1.StatusCodes.OK, users });
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
exports.default = router;
//# sourceMappingURL=user.router.js.map