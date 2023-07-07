import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';
export declare class GymFeaturesService {
    private prismaService;
    private appService;
    constructor(prismaService: PrismaService, appService: AppService);
    createGalleryLinke(file: any, gymId: number): Promise<HttpException>;
    deleteImage(id: number): Promise<HttpException>;
    add_manager(phoneNumber: string, description: string, gymId: number): Promise<HttpException>;
    addImageToGallery(file: any, link: string, gymId: number): Promise<void>;
    findOldManger(phoneNumber: string): Promise<import(".prisma/client").User>;
}
