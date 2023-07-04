import { Controller, Get, UseGuards, Request, Put, Body, Req } from '@nestjs/common';
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
        @Req() req: any,
        @Body() body: UpdateProfileDto
    ) {
        const { id } = req.user;
        return this.userService.updateProfileUsesr(id, body)
    }

    
}   