import { HttpException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGymDTO, UpdateGymDTO } from './DTO/gym.DTO';
export declare class GymService {
    private prismaService;
    private appService;
    constructor(prismaService: PrismaService, appService: AppService);
    add_request_gym(id: number, body: CreateGymDTO): Promise<HttpException>;
    edit_gym(id: number, body: UpdateGymDTO): Promise<HttpException>;
    updateUser(id: number): Promise<HttpException | import(".prisma/client").User>;
    updategym(id: number, body: UpdateGymDTO): Promise<import(".prisma/client").Gym>;
    findGym(id: number): Promise<import(".prisma/client").Gym>;
    createGym(id: number, body: CreateGymDTO): Promise<import(".prisma/client").Gym>;
}
