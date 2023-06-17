import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) { }

    async findOneUser(id: number): Promise<object> {
        console.log(id);
        const user = await this.prisma.user.findUnique({ where: { id } })
        return user;
    }

}
