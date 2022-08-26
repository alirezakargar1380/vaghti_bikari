import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-ioredis';

// 
import { CatModule } from './cat/cat.module';
import { chatGateway } from './chat.gateway';
import { BattleModule } from "./battle/battle.module";
// users
import { UsersModule } from './users/users.module';
import { FallenCubesService } from './fallen_cubes/fallen_cubes.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CatModule,
    UsersModule,
    BattleModule,
    CacheModule.register({
      store: redisStore,
      socket: {
        host: "localhost",
        port: 6379
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, chatGateway, FallenCubesService],
})
export class AppModule {}

const home_are_fill = [
  {
    x: 1,
    y: 20
  },
  {
    x: 2,
    y: 20
  },
  {
    x: 3,
    y: 20
  },
  {
    x: 4,
    y: 20
  },
  {
    x: 5,
    y: 20
  },
]
