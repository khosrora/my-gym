import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GymService],
  controllers: [GymController] , 
  imports : [PrismaModule]
})
export class GymModule {}