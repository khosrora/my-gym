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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_DTO_js_1 = require("./DTO/auth.DTO.js");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getPhoneNumber(body) {
        const { phoneNumber } = body;
        return this.authService.get_otp(phoneNumber);
    }
    checkCode(body, res) {
        const { phoneNumber, code } = body;
        return this.authService.check_otp(phoneNumber, code, res);
    }
    getAccessToken(res, req) {
        const { refreshToken } = req.cookies;
        return this.authService.get_accessToken(refreshToken, res);
    }
    logout(res) {
        return this.authService.logout(res);
    }
};
__decorate([
    (0, common_1.Post)('get_otp'),
    (0, swagger_1.ApiTags)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_DTO_js_1.PhoneNumberDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getPhoneNumber", null);
__decorate([
    (0, common_1.Post)("check_otp"),
    (0, swagger_1.ApiTags)("auth"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_DTO_js_1.OtpCodeDTO, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)("get_access_token"),
    (0, swagger_1.ApiTags)("auth"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.Get)("logout"),
    (0, swagger_1.ApiTags)("auth"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map