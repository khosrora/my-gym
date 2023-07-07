import { CreateGymDTO, UpdateGymDTO } from './DTO/gym.DTO';
import { GymService } from './gym.service';
export declare class GymController {
    private gymService;
    constructor(gymService: GymService);
    createGym(body: CreateGymDTO, req: any): Promise<import("@nestjs/common").HttpException>;
    upadteGym(body: UpdateGymDTO, req: any): Promise<import("@nestjs/common").HttpException>;
    createCoach(body: any): void;
}
