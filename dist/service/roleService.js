"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deteleRole = exports.updateRole = exports.createRole = void 0;
const errors_1 = require("./../shared/errors");
const errors_2 = require("../shared/errors");
const Role_1 = __importDefault(require("../models/Role"));
const mongoose_1 = require("mongoose");
const createRole = async ({ name }) => {
    if (!name) {
        throw new errors_2.ParamMissingError('Missing the parameter');
    }
    const newRole = new Role_1.default({
        name,
    });
    await newRole.save();
    return newRole;
};
exports.createRole = createRole;
const updateRole = async (id, name) => {
    if (!id) {
        throw new errors_2.ParamMissingError('Missing the parameter (/_id)');
    }
    if (!name) {
        throw new errors_2.ParamMissingError('Missing the parameter (/ name )');
    }
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new errors_1.NotFoundError('This role does not exist on the system');
    }
    const existRole = await Role_1.default.findById(id);
    if (!existRole) {
        throw new errors_1.NotFoundError('This role does not exist on the system');
    }
    const newRole = await Role_1.default.findByIdAndUpdate(id, { name }, { new: true });
    return newRole;
};
exports.updateRole = updateRole;
const deteleRole = async (id) => {
    if (!id) {
        throw new errors_2.ParamMissingError('Missing the parameter (/_id)');
    }
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new errors_1.NotFoundError('This role does not exist on the system');
    }
    const existRole = await Role_1.default.findById(id);
    if (!existRole) {
        throw new errors_1.NotFoundError('This role does not exist on the system');
    }
    const deletedRole = await Role_1.default.findByIdAndDelete(id);
    return deletedRole;
};
exports.deteleRole = deteleRole;
//# sourceMappingURL=roleService.js.map