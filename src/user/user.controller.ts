import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from './DTO/user.DTO';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    
    @Get()
    async findOne(@Request() req: any) {
        const { id } = req.user;
        return this.userService.findOneUser(id);
    }

    @Put()
    async updateProfileUser(
        @Body() body : UpdateProfileDto
    ){
        console.log(body);
        return ""
    }

}   