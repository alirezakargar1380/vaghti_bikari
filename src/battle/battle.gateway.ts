import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { BattleRepository } from "./battle.repository";
import { Socket } from 'socket.io';

@WebSocketGateway({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
export class battleGateway {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly battleRespository: BattleRepository
    ) {}
    @WebSocketServer()
    server

    @SubscribeMessage('create-battle')
    async createBattle(socket: Socket, data: string) {
        console.log('create-battle', data)
        const createdData = await this.battleRespository.create()
        console.log(createdData)
        socket.join("1")
        this.server.to("1").emit("fuck", null)
    }

    @SubscribeMessage('connection')
    async connection(socket: Socket, data: string) {
        console.log('connection')
    }
}