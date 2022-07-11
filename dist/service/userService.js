"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndUpdate = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../models/User"));
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const errors_1 = require("../shared/errors");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createAndUpdate = async (userInfo, file) => {
    const { userId } = userInfo;
    if (!userId) {
        throw new errors_1.ParamMissingError('Missing the parameter');
    }
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        throw new errors_1.NotFoundError('This account does not exist on the system');
    }
    const existingUser = await User_1.default.findById(userId);
    if (!existingUser) {
        throw new errors_1.UnauthorizedError('User is not authenticated');
    }
    const existingUserInfo = await UserInfo_1.default.findOne({ userId });
    const uploader = (0, lodash_1.isString)(file) &&
        file &&
        (await cloudinary_1.default.uploader.upload(file, {
            overwrite: true,
            public_id: userId,
        }));
    const update = uploader
        ? Object.assign(Object.assign({}, userInfo), { avatar: {
                url: uploader === null || uploader === void 0 ? void 0 : uploader.secure_url,
                public_id: uploader === null || uploader === void 0 ? void 0 : uploader.public_id,
            } }) : userInfo;
    if (existingUserInfo) {
        const userInfoUpdate = await UserInfo_1.default.findOneAndUpdate({ userId }, update, {
            new: true,
        });
        return userInfoUpdate;
    }
    const newUserInfo = new UserInfo_1.default(update);
    await newUserInfo.save();
    await User_1.default.findByIdAndUpdate(userId, {
        info: newUserInfo._id,
    });
    return newUserInfo;
};
exports.createAndUpdate = createAndUpdate;
//# sourceMappingURL=userService.js.map