"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const PostLike_1 = require("./PostLike");
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
class Post {
}
__decorate([
    (0, typegoose_1.Prop)({ type: () => typegoose_1.mongoose.Schema.Types.Map }),
    __metadata("design:type", Object)
], Post.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.Prop)({ ref: () => User_1.User }),
    __metadata("design:type", Object)
], Post.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.Prop)({ ref: () => PostLike_1.PostLikes }),
    __metadata("design:type", Object)
], Post.prototype, "likes", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "commentId", void 0);
exports.Post = Post;
const PostModel = (0, typegoose_1.getModelForClass)(Post);
exports.default = PostModel;
//# sourceMappingURL=Post.js.map