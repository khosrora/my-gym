import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GymFeaturesController } from './gym-features.controller';
import { GymFeaturesService } from './gym-features.service';

@Module({
  controllers: [GymFeaturesController],
  providers: [GymFeaturesService] , 
  imports : [PrismaModule , forwardRef(() => AppModule)]
})
export class GymFeaturesModule {}
