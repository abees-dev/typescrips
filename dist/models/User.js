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
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const Role_1 = require("./Role");
const UserInfo_1 = require("./UserInfo");
class User extends defaultClasses_1.TimeStamps {
    static async findByEmail(email) {
        return this.findOne({ email }).exec();
    }
    static async updateUserParameters(query, data) {
        return this.findOneAndUpdate(query, { data }, { new: true });
    }
    static async getUserByIdPopulate(id) {
        return this.findById(id)
            .populate({ path: 'info', select: '-userId' })
            .populate({ path: 'role', select: '_id, name' })
            .select('-password')
            .exec();
    }
}
__decorate([
    (0, typegoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.Prop)({ ref: () => Role_1.Role, type: () => String }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.Prop)({ ref: () => UserInfo_1.UserInfo }),
    __metadata("design:type", Object)
], User.prototype, "info", void 0);
exports.User = User;
const UserModel = (0, typegoose_1.getModelForClass)(User);
exports.default = UserModel;
//# sourceMappingURL=User.js.map