import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';
export declare class AuthService {
    private prismaService;
    private appService;
    constructor(prismaService: PrismaService, appService: AppService);
    get_otp(phoneNumber: string): Promise<HttpException>;
    check_otp(phoneNumber: string, code: number, res: Response): Promise<HttpException>;
    get_accessToken(token: string, res: Response): Promise<HttpStatus>;
    logout(res: Response): Promise<HttpException>;
    findUserByPhone(phoneNumber: string): Promise<import(".prisma/client").User>;
    createUser(phoneNumber: string): Promise<HttpException>;
    sendCode(phoneNumber: string, code: number): Promise<void>;
    setRefreshToken(id: number, res: Response): Promise<void>;
    setAccessToken(id: number, res: Response): Promise<void>;
}
