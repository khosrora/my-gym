import { Matches, IsNumber, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class PhoneNumberDTO {
    @ApiProperty({
        type: String
    })
    @Matches(/^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, { message: "شماره تماس وارد شده معتبر نیست" })
    phoneNumber: string;
}

export class OtpCodeDTO {
    @ApiProperty({
        type: String
    })
    @Matches(/^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, { message: "شماره تماس وارد شده معتبر نیست" })
    phoneNumber: string;

    @ApiProperty({
        type: Number
    })
    @Min(5, { message: "تعداد کاراکتر اشتباه است" })
    @IsNumber()
    code: number;
}