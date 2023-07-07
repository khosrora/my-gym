import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppModule } from 'src/app.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, forwardRef(() => AppModule)]
})
export class AuthModule { }
