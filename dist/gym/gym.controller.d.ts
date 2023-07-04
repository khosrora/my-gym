import { CreateGymDTO } from './DTO/gym.DTO';
import { GymService } from './gym.service';
export declare class GymController {
    private gymService;
    constructor(gymService: GymService);
    createGym(body: CreateGymDTO, req: any): CreateGymDTO;
}
