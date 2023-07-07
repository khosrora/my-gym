import { Body, Controller, Post, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGymDTO, UpdateGymDTO } from './DTO/gym.DTO';
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
        const { id } = req.user;
        return this.gymService.add_request_gym(id, body);
    }

    @Patch("edit")
    upadteGym(
        @Body() body: UpdateGymDTO,
        @Request() req: any
    ) {
        const { id } = req.user;
        return this.gymService.edit_gym(id, body);
    }

    @Post("add_coach")
    createCoach(
        @Body() body: any
    ) {
        console.log(body);
    }

}
