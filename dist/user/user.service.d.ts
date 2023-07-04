import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './DTO/user.DTO';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneUser(id: number): Promise<object>;
    updateProfileUsesr(id: number, body: UpdateProfileDto): Promise<HttpException>;
}
