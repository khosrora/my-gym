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
exports.GymFeaturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const path_1 = require("path");
const client_1 = require("@prisma/client");
const app_service_1 = require("../app.service");
let GymFeaturesService = class GymFeaturesService {
    constructor(prismaService, appService) {
        this.prismaService = prismaService;
        this.appService = appService;
    }
    async createGalleryLinke(file, gymId) {
        const link = `${process.env.URL}/images/${file.filename}`;
        await this.addImageToGallery(file, link, gymId);
        return new common_1.HttpException({ message: "عکس با موفقیت اضافه شد" }, common_1.HttpStatus.CREATED);
    }
    async deleteImage(id) {
        try {
            const image = await this.prismaService.gallery.delete({ where: { id: Number(id) } });
            fs.unlinkSync((0, path_1.join)(__dirname + '../../../' + `/uploads/images/${image.imageName}`));
            return new common_1.HttpException({ message: "عکس از گالری حذف شد" }, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async add_manager(phoneNumber, description, gymId) {
        try {
            const oldManger = await this.findOldManger(phoneNumber);
            if (!!oldManger && oldManger.role === client_1.USERROLE.COACH)
                return new common_1.HttpException({ message: "این کاربر به عنوان مربی قبلا ثبت شده است" }, common_1.HttpStatus.BAD_REQUEST);
            const newManager = await this.prismaService.user.upsert({
                where: {
                    phoneNumber
                },
                create: {
                    codeOtp: await this.appService.createRandomNumber(),
                    phoneNumber,
                    description,
                    gymCoach: Number(gymId),
                    role: client_1.USERROLE.COACH
                },
                update: {
                    role: client_1.USERROLE.COACH,
                    description,
                    gymCoach: Number(gymId)
                }
            });
            return new common_1.HttpException({ message: "مربی به باشگاه اضافه شد", newManager }, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async addImageToGallery(file, link, gymId) {
        try {
            await this.prismaService.gallery.create({
                data: {
                    imageName: file.filename,
                    link,
                    gymId: Number(gymId),
                }
            });
        }
        catch (error) {
            fs.unlinkSync((0, path_1.join)(__dirname + '../../../' + `/uploads/images/${file.filename}`));
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOldManger(phoneNumber) {
        return await this.prismaService.user.findUnique({ where: { phoneNumber } });
    }
};
GymFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        app_service_1.AppService])
], GymFeaturesService);
exports.GymFeaturesService = GymFeaturesService;
//# sourceMappingURL=gym-features.service.js.map