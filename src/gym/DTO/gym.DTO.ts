import { IsNumber, IsString } from "class-validator"




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