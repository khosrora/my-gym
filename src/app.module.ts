import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GymModule } from './gym/gym.module';
import { GymFeaturesModule } from './gym-features/gym-features.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, GymModule, GymFeaturesModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports : [AppService]
})

export class AppModule { }