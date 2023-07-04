import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { OtpCodeDTO, PhoneNumberDTO } from './DTO/auth.DTO.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getPhoneNumber(body: PhoneNumberDTO): Promise<import("@nestjs/common").HttpException>;
    checkCode(body: OtpCodeDTO, res: Response): Promise<import("@nestjs/common").HttpException>;
    getAccessToken(res: Response, req: Request): Promise<import("@nestjs/common").HttpStatus>;
    logout(res: Response): Promise<import("@nestjs/common").HttpException>;
}
