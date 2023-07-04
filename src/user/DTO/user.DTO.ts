import { IsEmail, IsString } from "class-validator"




export class UpdateProfileDto {

    @IsString()
    fullname : string
    
    @IsString()
    @IsEmail()
    email : string

}