import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express'
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from "jsonwebtoken";
import { AppService } from 'src/app.service';

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private appService: AppService
    ) { }

    async get_otp(phoneNumber: string) {
        const user = await this.findUserByPhone(phoneNumber);
        if (!user) return this.createUser(phoneNumber);
        this.sendCode(user.phoneNumber, user.codeOtp)
        return new HttpException('کد اعتبار سنجی برای شما ارسال شد', HttpStatus.OK);
    }

    async check_otp(phoneNumber: string, code: number, res: Response) {
        const user = await this.findUserByPhone(phoneNumber);
        if (!user) return new HttpException('لطفا ابتدا ثبت نام کنید', HttpStatus.BAD_REQUEST);
        if (user.codeOtp === code) {
            await this.prismaService.user.update({
                where: { phoneNumber },
                data: {
                    codeOtp: await this.appService.createRandomNumber()
                }
            })
            await this.setRefreshToken(user.id, res);
            return new HttpException({ message: 'ورود شما موفقیت آمیز بود' }, HttpStatus.OK);
        }
        return new HttpException('کد وارد شده اشتباه است', HttpStatus.BAD_REQUEST);
    }

    async get_accessToken(token: string, res: Response) {
        const { id }: any = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        await this.setAccessToken(id, res);
        return HttpStatus.OK;
    }

    async logout(res: Response) {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return new HttpException({ message: "خارج شدید" }, HttpStatus.OK);
    }

    async findUserByPhone(phoneNumber: string) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    phoneNumber
                }
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async createUser(phoneNumber: string) {
        try {
            const code = await this.appService.createRandomNumber();
            const newUser = await this.prismaService.user.create({
                data: {
                    phoneNumber,
                    codeOtp: code,
                }
            });

            await this.sendCode(phoneNumber, newUser.codeOtp);

            return new HttpException('کد اعتبار سنجی برای شما ارسال شد', HttpStatus.OK)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async sendCode(phoneNumber: string, code: number) {
        console.log(`send ${code} to phone number ${phoneNumber}`);
    }

    async setRefreshToken(id: number, res: Response) {
        const refreshToken = await jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, domain: 'localhost', });
    }

    async setAccessToken(id: number, res: Response) {
        const refreshToken = await jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
        res.cookie('accessToken', refreshToken, { httpOnly: true, domain: 'localhost', });
    }

}
