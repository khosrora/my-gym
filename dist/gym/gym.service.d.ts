import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGymDTO } from './DTO/gym.DTO';
export declare class GymService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createGym(id: number, body: CreateGymDTO): Promise<void>;
}
