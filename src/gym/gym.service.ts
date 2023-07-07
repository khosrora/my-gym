import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { USERROLE } from '@prisma/client';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGymDTO, UpdateGymDTO } from './DTO/gym.DTO';

@Injectable()
export class GymService {
    constructor(
        private prismaService: PrismaService,
        private appService: AppService
    ) { }

    async add_request_gym(id: number, body: CreateGymDTO) {
        try {
            const gym = await this.createGym(id, body)
            await this.updateUser(id)
            return new HttpException({ message: 'باشگاه شما با موفقیت ثبت شد', gym }, HttpStatus.CREATED);
        } catch (error) {
            console.log(error.message);
        }
    }

    async edit_gym(id: number, body: UpdateGymDTO) {
        const gym = await this.findGym(id);
        if (!gym) return new HttpException({ message: 'باشگاه شما ثبت نشده است' }, HttpStatus.BAD_REQUEST);
        const updateGym = await this.updategym(id, body);
        return new HttpException({ message: 'باشگاه شما با موفقیت ویرایش شد', updateGym }, HttpStatus.OK);
    }

    async updateUser(id: number) {
        try {
            return await this.prismaService.user.update({
                data: {
                    role: USERROLE.MANAGER
                },
                where: { id }
            })
        } catch (error) {
            return new HttpException({ message: error.message }, HttpStatus.BAD_GATEWAY);
        }
    }

    async updategym(id: number, body: UpdateGymDTO) {
        try {
            return await this.prismaService.gym.update({
                where: { userId: id },
                data: { ...body }
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async findGym(id: number) {
        try {
            return await this.prismaService.gym.findUnique({ where: { userId: id } })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async createGym(id: number, body: CreateGymDTO) {
        try {
            const code = await this.appService.createRandomNumber();
            let data = {
                englishName: body.englishName,
                persianName: body.persianName,
                address: body.address,
                description: body.address,
                lat: body.lat,
                long: body.long,
                userId: id,
                expiresTime: new Date(),
                isOpen: true,
                uniqueCode: code,
            }
            return await this.prismaService.gym.upsert({
                where: {
                    userId: id
                },
                update: { ...data },
                create: { ...data }
            })
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error.message)
        }
    }


}
