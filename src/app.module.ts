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
  providers: [AppService, chatGateway],
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
console.log(home_are_fill)
function checkIsCompleteAHomeOrNot() {
  let rowLength = 5
  let fillRowNum = 0
  let fillRows: number[] = []
  for (let r = 1; r <= 20; r++) {
    fillRowNum = 0
    home_are_fill.forEach(({ x, y }) => {
      if (r === y) {
        fillRowNum++
      }
    })
    console.log(fillRowNum)
    if (rowLength === fillRowNum) {
      fillRows.push(r)
    }
  }

  return fillRows
}



checkIsCompleteAHomeOrNot()
