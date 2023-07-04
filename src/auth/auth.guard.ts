import * as jwt from "jsonwebtoken";


import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private prismaService: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies.accessToken ; 
        // const token = request?.headers?.authorization?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            await jwt.verify(token, process.env.JWT_REFRESH_TOKEN, async (err: any, payload: any) => {
                if (err) throw new UnauthorizedException();
                const user = await this.prismaService.user.findUnique({ where: { id: payload.id } })
                request['user'] = { id: user.id };
            })
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}