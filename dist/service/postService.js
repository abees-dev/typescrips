"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByUserID = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const mongoose_1 = require("mongoose");
const Post_1 = __importDefault(require("../models/Post"));
const errors_1 = require("../shared/errors");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createPost = async (post, file) => {
    const { userId, content } = post;
    const _id = new mongoose_1.Types.ObjectId();
    if (!userId || !content || !file) {
        throw new errors_1.ParamMissingError('Missing the parameter (/ userId) or (/ content)');
    }
    const uploader = await cloudinary_1.default.uploader.upload(file, { overwrite: true, public_id: _id });
    const newPost = new Post_1.default({
        _id,
        userId,
        content,
        image: {
            url: uploader.secure_url,
            public_id: uploader.public_id,
        },
    });
    await newPost.save();
    return newPost;
};
exports.createPost = createPost;
const updatePost = async (id, data, file) => {
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        throw new errors_1.ParamMissingError('Missing the parameter (/ _id)');
    }
    const post = await Post_1.default.findById(id);
    const uploader = file && (await cloudinary_1.default.uploader.upload(file, { overwrite: true, public_id: id }));
    const dataUpdate = file
        ? Object.assign(Object.assign({}, data), { image: {
                url: uploader === null || uploader === void 0 ? void 0 : uploader.secure_url,
                public_id: uploader === null || uploader === void 0 ? void 0 : uploader.public_id,
            } }) : data;
    if (!post) {
        throw new errors_1.NotFoundError('This post does not exist on the system');
    }
    const newPost = await Post_1.default.findByIdAndUpdate(id, dataUpdate, { new: true });
    return newPost;
};
exports.updatePost = updatePost;
const deletePost = async (id) => {
    if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
        throw new errors_1.NotFoundError('This post does not exist on the system');
    }
    await Post_1.default.findByIdAndDelete(id);
};
exports.deletePost = deletePost;
const getPostByUserID = async (userId) => {
    if (!userId) {
        throw new errors_1.ParamMissingError('Missing the paramete (/ _id)');
    }
    const post = await Post_1.default.find({ userId }).populate({
        path: 'likes',
        populate: { path: 'userId', select: '-password', populate: { path: 'info' } },
    });
    return post;
};
exports.getPostByUserID = getPostByUserID;
//# sourceMappingURL=postService.js.map