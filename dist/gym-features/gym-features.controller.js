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
exports.GymFeaturesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const gym_features_service_1 = require("./gym-features.service");
const multer_1 = require("multer");
const path_1 = require("path");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const GymFeaturesDTO_1 = require("./DTO/GymFeaturesDTO");
let multerOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/images',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        }
    })
};
let GymFeaturesController = class GymFeaturesController {
    constructor(gymFeature) {
        this.gymFeature = gymFeature;
    }
    async upload(file, param) {
        const { id: gymId } = param;
        return this.gymFeature.createGalleryLinke(file, gymId);
    }
    async deleteImage(param) {
        const { id: imageId } = param;
        return this.gymFeature.deleteImage(imageId);
    }
    async addManager(param, body) {
        const { phoneNumber, description } = body;
        const { gymId } = param;
        return this.gymFeature.add_manager(phoneNumber, description, gymId);
    }
};
__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GymFeaturesController.prototype, "upload", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GymFeaturesController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)('addManager/:gymId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GymFeaturesDTO_1.AddManagerDTO]),
    __metadata("design:returntype", Promise)
], GymFeaturesController.prototype, "addManager", null);
GymFeaturesController = __decorate([
    (0, common_1.Controller)('gym-features'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('gym-features'),
    __metadata("design:paramtypes", [gym_features_service_1.GymFeaturesService])
], GymFeaturesController);
exports.GymFeaturesController = GymFeaturesController;
//# sourceMappingURL=gym-features.controller.js.map