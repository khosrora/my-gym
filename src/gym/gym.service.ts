import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGymDTO } from './DTO/gym.DTO';

@Injectable()
export class GymService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async createGym(id: number, body: CreateGymDTO) {
        const newGym = await this.prismaService.gym.create({
            data: {
                englishName: body.englishName,
                persianName: body.persianName,
                address: body.address,
                description: body.address,
                lat: body.lat,
                long: body.long,
                userId: id,
                expireTime: 1234556878,
                isOpen: true,
                uniqueCode: 1234
            }
        })
        console.log(newGym);
    }
}
