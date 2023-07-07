import { HttpException } from '@nestjs/common';
import { GymFeaturesService } from './gym-features.service';
import { AddManagerDTO } from './DTO/GymFeaturesDTO';
export declare class GymFeaturesController {
    private gymFeature;
    constructor(gymFeature: GymFeaturesService);
    upload(file: any, param: {
        id: number;
    }): Promise<HttpException>;
    deleteImage(param: {
        id: number;
    }): Promise<HttpException>;
    addManager(param: {
        gymId: number;
    }, body: AddManagerDTO): Promise<HttpException>;
}
