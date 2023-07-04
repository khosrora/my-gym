import { UpdateProfileDto } from './DTO/user.DTO';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findOne(req: any): Promise<object>;
    updateProfileUser(req: any, body: UpdateProfileDto): Promise<import("@nestjs/common").HttpException>;
}
