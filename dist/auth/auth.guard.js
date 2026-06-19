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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const firebase_service_1 = require("./firebase.service");
const user_schema_1 = require("../schemas/user.schema");
let AuthGuard = class AuthGuard {
    firebaseService;
    userModel;
    constructor(firebaseService, userModel) {
        this.firebaseService = firebaseService;
        this.userModel = userModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
            let user = await this.userModel.findOne({ firebaseUid: decodedToken.uid });
            if (!user) {
                user = await this.userModel.create({
                    firebaseUid: decodedToken.uid,
                    email: decodedToken.email,
                    name: decodedToken.name || decodedToken.email?.split('@')[0],
                    avatar: decodedToken.picture || '',
                });
            }
            request.user = user;
            return true;
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        mongoose_2.Model])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map