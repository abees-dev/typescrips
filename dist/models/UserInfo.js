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
exports.UserInfo = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (Gender = {}));
class UserInfo extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], UserInfo.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], UserInfo.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], UserInfo.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], UserInfo.prototype, "phoneNumber", void 0);
__decorate([
    (0, typegoose_1.Prop)({ enum: Gender }),
    __metadata("design:type", String)
], UserInfo.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Date)
], UserInfo.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typegoose_1.Prop)({ type: () => typegoose_1.mongoose.Schema.Types.Map }),
    __metadata("design:type", Object)
], UserInfo.prototype, "avatar", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], UserInfo.prototype, "address", void 0);
exports.UserInfo = UserInfo;
const UserInfoModel = (0, typegoose_1.getModelForClass)(UserInfo);
exports.default = UserInfoModel;
//# sourceMappingURL=UserInfo.js.map