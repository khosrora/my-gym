import { Matches, MinLength, MaxLength, Length, IsNumber, Min, Max } from "class-validator";



export class PhoneNumberDTO {
    @Matches(/^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, { message: "شماره تماس وارد شده معتبر نیست" })
    phoneNumber: string;
}

export class OtpCodeDTO {
    @Matches(/^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, { message: "شماره تماس وارد شده معتبر نیست" })
    phoneNumber: string;

    @Min(5, { message: "تعداد کاراکتر اشتباه است" })
    @IsNumber()
    code: number;
}