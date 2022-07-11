"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const Role_1 = __importDefault(require("../models/Role"));
const roleService_1 = require("../service/roleService");
const router = (0, express_1.Router)();
router.get('/all', async (_, res) => {
    try {
        const roles = await Role_1.default.find();
        return res.status(200).json({ code: 200, roles });
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
router.post('/create', async (req, res) => {
    try {
        const roles = req.body;
        const newRole = await (0, roleService_1.createRole)(roles);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ code: http_status_codes_1.StatusCodes.OK, message: 'Create Role', roles: newRole });
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
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const newRole = await (0, roleService_1.updateRole)(id, name);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ code: http_status_codes_1.StatusCodes.OK, message: 'Update Role successfully!', role: newRole });
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
router.delete('/detele/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRole = await (0, roleService_1.deteleRole)(id);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ code: http_status_codes_1.StatusCodes.OK, message: 'Deleted Role successfully!', role: deletedRole });
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
//# sourceMappingURL=role.router.js.map