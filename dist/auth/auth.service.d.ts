import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    get_otp(phoneNumber: string): Promise<HttpException>;
    check_otp(phoneNumber: string, code: number): Promise<HttpException>;
    findUser(phoneNumber: string): Promise<import(".prisma/client").User>;
    createUser(phoneNumber: string): Promise<HttpException>;
    sendCode(phoneNumber: string, code: number): Promise<void>;
    createToken(id: number, time: string): Promise<any>;
}
