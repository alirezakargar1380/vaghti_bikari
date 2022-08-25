import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-ioredis';

// 
import { CatModule } from './cat/cat.module';
import { chatGateway } from './chat.gateway';
import { battleGateway } from "./battle/battle.gateway";
// users
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CatModule,
    UsersModule,
    CacheModule.register({
      store: redisStore,
      socket: {
        host: "localhost",
        port: 6379
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, chatGateway, battleGateway],
})
export class AppModule {}
