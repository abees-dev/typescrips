"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndUpdate = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const errors_1 = require("../shared/errors");
const createAndUpdate = async (userInfo) => {
    const { userId, firstName, lastName, phoneNumber, gender, address } = userInfo;
    if (!userId) {
        throw new errors_1.ParamMissingError('Missing the parameter');
    }
    const existingUser = await User_1.default.findById(userId);
    if (existingUser) {
        const newUserInfo = await UserInfo_1.default.findOneAndUpdate({ userId: existingUser._id }, {
            userId,
            firstName,
            lastName,
            phoneNumber,
            gender,
            address,
        }, { new: true });
        return newUserInfo;
    }
    const newUserInfo = new UserInfo_1.default({
        userId,
        firstName,
        lastName,
        phoneNumber,
        gender,
        address,
    });
    await newUserInfo.save();
    const userUpdate = await User_1.default.findByIdAndUpdate(userId, {
        info: newUserInfo._id,
    });
    console.log(userUpdate);
    return newUserInfo;
};
exports.createAndUpdate = createAndUpdate;
//# sourceMappingURL=userService.js.map