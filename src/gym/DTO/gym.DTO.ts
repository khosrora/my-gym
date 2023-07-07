import { IsBoolean, IsString, IsEmpty, IsOptional, IsNumber, IsEmail, Matches } from "class-validator"




export class CreateGymDTO {
    @IsString()
    persianName: string
    @IsString()
    englishName: string
    @IsString()
    phoneNumber: string
    @IsString()
    address: string
    @IsString()
    managerName: string
    @IsString()
    lat: string
    @IsString()
    long: string
    @IsString()
    description: string
}

export class UpdateGymDTO {
    @IsOptional()
    @IsString()
    persianName: string
    @IsOptional()
    @IsString()
    englishName: string
    @IsOptional()
    @IsString()
    phoneNumber: string
    @IsOptional()
    @IsString()
    address: string
    @IsOptional()
    @IsString()
    managerName: string
    @IsOptional()
    @IsString()
    lat: string
    @IsOptional()
    @IsString()
    long: string
    @IsOptional()
    @IsString()
    description: string
    @IsOptional()
    @IsBoolean()
    isOpen?: boolean
}

export class CreateCoachDTO {
    @IsString()
    @Matches(/^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, { message: "شماره تماس وارد شده معتبر نیست" })
    phoneNumber: string
    @IsString()
    @IsEmail()
    email: string
    @IsString()
    fullname: string
}