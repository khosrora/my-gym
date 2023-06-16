import { Body, Controller, Post } from '@nestjs/common';
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
        @Body() body : OtpCodeDTO
    ){
        const { phoneNumber , code } = body;
        return this.authService.check_otp(phoneNumber , code)
    }

}
