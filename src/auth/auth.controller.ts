import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express'
import { AuthService } from './auth.service';
import { OtpCodeDTO, PhoneNumberDTO } from './DTO/auth.DTO.js';
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('get_otp')
    @ApiTags('auth')
    getPhoneNumber(
        @Body() body: PhoneNumberDTO
    ) {
        const { phoneNumber } = body;
        return this.authService.get_otp(phoneNumber)
    }

    @Post("check_otp")
    @ApiTags("auth")
    checkCode(
        @Body() body: OtpCodeDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const { phoneNumber, code } = body;
        return this.authService.check_otp(phoneNumber, code, res)
    }

    @Post("get_access_token")
    @ApiTags("auth")
    getAccessToken(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        const { refreshToken } = req.cookies;
        return this.authService.get_accessToken(refreshToken, res);
    }

    @Get("logout")
    @ApiTags("auth")
    logout(
        @Res({ passthrough: true }) res: Response
    ) {
        return this.authService.logout(res)
    }

}
