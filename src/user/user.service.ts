import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from "@prisma/client";
import { UpdateProfileDto } from './DTO/user.DTO';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) { }

    async findOneUser(id: number): Promise<object> {
        const user = await this.prisma.user.findUnique({ where: { id } })
        return user;
    }

    async updateProfileUsesr(id: number, body: UpdateProfileDto) {
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                fullname: body.fullname,
                email: body.email
            }
        })
        return new HttpException({ message: "پروفابل ویرایش شد", user }, HttpStatus.OK);
    }

}
