import { forwardRef, Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppModule } from './../app.module';

@Module({
  providers: [GymService],
  controllers: [GymController],
  imports: [PrismaModule, forwardRef(() => AppModule)]
})
export class GymModule { }