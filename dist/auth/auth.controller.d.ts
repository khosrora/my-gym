import { AuthService } from './auth.service';
import { OtpCodeDTO, PhoneNumberDTO } from './DTO/auth.DTO.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getPhoneNumber(body: PhoneNumberDTO): Promise<import("@nestjs/common").HttpException>;
    checkCode(body: OtpCodeDTO): Promise<import("@nestjs/common").HttpException>;
}
