"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ParamMissingError = exports.UserConflictError = exports.NotFoundError = exports.CustomError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class CustomError extends Error {
    constructor(msg, code) {
        super(msg);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.statusCode = code;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(msg) {
        super(msg, NotFoundError.statusCode);
    }
}
exports.NotFoundError = NotFoundError;
NotFoundError.Msg = 'User is not on the system';
NotFoundError.statusCode = http_status_codes_1.default.NOT_FOUND;
class UserConflictError extends CustomError {
    constructor() {
        super(UserConflictError.Msg, UserConflictError.statusCode);
    }
}
exports.UserConflictError = UserConflictError;
UserConflictError.Msg = 'Duplicate email address';
UserConflictError.statusCode = http_status_codes_1.default.CONFLICT;
class ParamMissingError extends CustomError {
    constructor(msg) {
        super(msg, ParamMissingError.statusCode);
    }
}
exports.ParamMissingError = ParamMissingError;
ParamMissingError.Msg = 'Missing parameter';
ParamMissingError.statusCode = http_status_codes_1.default.BAD_REQUEST;
class UnauthorizedError extends CustomError {
    constructor(msg) {
        super(msg, UnauthorizedError.statusCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
UnauthorizedError.Msg = 'Unauthorized';
UnauthorizedError.statusCode = http_status_codes_1.default.UNAUTHORIZED;
//# sourceMappingURL=errors.js.map