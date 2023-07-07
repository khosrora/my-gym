import { IsString } from 'class-validator';



export class AddManagerDTO {
    @IsString()
    phoneNumber : string;
    @IsString()
    description : string;
}