"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByUserID = exports.createPost = void 0;
const errors_1 = require("./../shared/errors");
const Post_1 = __importDefault(require("../models/Post"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const typegoose_1 = require("@typegoose/typegoose");
const createPost = async (post, file) => {
    const { userId, content } = post;
    if (!userId || !content || !file) {
        throw new errors_1.ParamMissingError('Missing the parameter (/ userId) or (/ content)');
    }
    const uploader = await cloudinary_1.default.uploader.upload(file);
    const newPost = new Post_1.default({
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
const getPostByUserID = async (userId) => {
    if (!userId) {
        throw new errors_1.ParamMissingError('Missing the paramete (/ _id)');
    }
    const ObjectId = typegoose_1.mongoose.Types.ObjectId;
    const post = await Post_1.default.aggregate([{ $match: { userId: new ObjectId(userId) } }]).lookup({
        from: 'postlikes',
        localField: 'likes',
        foreignField: '_id',
        as: 'postlikes',
    });
    return post;
};
exports.getPostByUserID = getPostByUserID;
//# sourceMappingURL=postService.js.map