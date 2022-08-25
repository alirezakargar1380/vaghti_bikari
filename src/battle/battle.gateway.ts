import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

@WebSocketGateway({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
export class battleGateway {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    @WebSocketServer()
    server

    @SubscribeMessage('create-battle')
    createBattle() {
        console.log('create-battle')
    }
}