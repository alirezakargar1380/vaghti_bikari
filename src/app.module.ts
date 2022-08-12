import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// 
import { CatModule } from './cat/cat.module';
import { chatGateway } from './chat.gateway';
// users
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CatModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, chatGateway],
})
export class AppModule {}
