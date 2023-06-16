import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async get_otp(phoneNumber: string) {
        const user = await this.findUser(phoneNumber);
        if (!user) return this.createUser(phoneNumber);
        this.sendCode(user.phoneNumber, user.codeOtp)
        return new HttpException('کد اعتبار سنجی برای شما ارسال شد', HttpStatus.OK);
    }

    async check_otp(phoneNumber: string, code: number) {
        const user = await this.findUser(phoneNumber);
        if (!user) return new HttpException('لطفا ابتدا ثبت نام کنید', HttpStatus.BAD_REQUEST);
        if (user.codeOtp === code) {
            await this.prismaService.user.update({
                where: { phoneNumber },
                data: {
                    codeOtp: Math.floor(100000 + Math.random() * 900000)
                }
            })
            const token = await this.createToken(user.id, '1h');
            return new HttpException({ message: 'ورود شما موفقیت آمیز بود', token }, HttpStatus.OK);
        }
        return new HttpException('کد وارد شده اشتباه است', HttpStatus.BAD_REQUEST);
    }

    async findUser(phoneNumber: string) {
        return await this.prismaService.user.findUnique({
            where: {
                phoneNumber
            }
        })
    }

    async createUser(phoneNumber: string) {
        const newUser = await this.prismaService.user.create({
            data: {
                phoneNumber,
                codeOtp: Math.floor(100000 + Math.random() * 900000),
                haveGym: false
            }
        });

        await this.sendCode(phoneNumber, newUser.codeOtp);

        return new HttpException('کد اعتبار سنجی برای شما ارسال شد', HttpStatus.OK)
    }

    async sendCode(phoneNumber: string, code: number) {
        console.log(`send ${code} to phone number ${phoneNumber}`);
    }

    async createToken(id: number, time: string) {
        return await jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: time });
    }

}
