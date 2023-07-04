import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGymDTO } from './DTO/gym.DTO';
import { GymService } from './gym.service';

@Controller("gym")
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('gym')
export class GymController {

    constructor(
        private gymService: GymService
    ) { }

    @Post("add")
    createGym(
        @Body() body: CreateGymDTO,
        @Request() req: any
    ) {
        const userId = req.user;
        
        return body;
    }

}
