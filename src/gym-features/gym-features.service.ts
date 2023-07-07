import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { USERROLE } from '@prisma/client';
import { AppService } from 'src/app.service';

@Injectable()
export class GymFeaturesService {
    constructor(
        private prismaService: PrismaService,
        private appService: AppService
    ) { }

    async createGalleryLinke(file: any, gymId: number) {
        const link = `${process.env.URL}/images/${file.filename}`
        await this.addImageToGallery(file, link, gymId);
        return new HttpException({ message: "عکس با موفقیت اضافه شد" }, HttpStatus.CREATED)
    }

    async deleteImage(id: number) {
        try {
            const image = await this.prismaService.gallery.delete({ where: { id: Number(id) } });
            fs.unlinkSync(join(__dirname + '../../../' + `/uploads/images/${image.imageName}`))
            return new HttpException({ message: "عکس از گالری حذف شد" }, HttpStatus.OK)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async add_manager(phoneNumber: string, description: string, gymId: number) {
        try {
            const oldManger = await this.findOldManger(phoneNumber)
            if (!!oldManger && oldManger.role === USERROLE.COACH) return new HttpException({ message: "این کاربر به عنوان مربی قبلا ثبت شده است" }, HttpStatus.BAD_REQUEST);
            const newManager = await this.prismaService.user.upsert({
                where: {
                    phoneNumber
                },
                create: {
                    codeOtp: await this.appService.createRandomNumber(),
                    phoneNumber,
                    description,
                    gymCoach: Number(gymId),
                    role: USERROLE.COACH
                },
                update: {
                    role: USERROLE.COACH,
                    description,
                    gymCoach: Number(gymId)
                }
            });
            return new HttpException({ message: "مربی به باشگاه اضافه شد", newManager }, HttpStatus.OK);
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async addImageToGallery(file: any, link: string, gymId: number) {
        try {
            await this.prismaService.gallery.create({
                data: {
                    imageName: file.filename,
                    link,
                    gymId: Number(gymId),
                }
            })
        } catch (error) {
            fs.unlinkSync(join(__dirname + '../../../' + `/uploads/images/${file.filename}`))
            throw new BadRequestException(error.message)
        }
    }

    async findOldManger(phoneNumber: string) {
        return await this.prismaService.user.findUnique({ where: { phoneNumber } });
    }
}
