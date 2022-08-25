import { Module, CacheModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { BattleSchema } from "./schemas/battle.schema";
import { battleGateway } from "./battle.gateway"
import * as redisStore from 'cache-manager-ioredis';

import {BattleRepository} from "./battle.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "battles",
                schema: BattleSchema
            }
        ]),
        CacheModule.register({
            store: redisStore,
            socket: {
                host: "localhost",
                port: 6379
            }
        })
    ],
    providers: [battleGateway, BattleRepository],
    // controllers: [UsersController]
})
export class BattleModule { }