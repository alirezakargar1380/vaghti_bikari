import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { AppService } from './app.service';

@WebSocketGateway({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
export class chatGateway {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly appService: AppService
        ) { 
        // console.log("set default speed")
        this.cacheManager.set("1", "slow", {
            ttl: 1000 * 60 * 60
        })

        this.cacheManager.set("coor", JSON.stringify({
            x: 5,
            y: 1,
            date: new Date()
        }), {
            ttl: 1000 * 60 * 60
        })
    }
    @WebSocketServer()
    server

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() message: string) {
        console.log("CALLED")
        // if ()

        setInterval( async (speed = "slow", coor = { x: 5, y: 1 }) => {
            const ss = await this.cacheManager.get("1")
            if (ss !== speed) return

            const currentCoor: any = JSON.parse(await this.cacheManager.get("coor"))
            currentCoor.called = true
            if (!currentCoor) {
                currentCoor.x = 5,
                currentCoor.y = 1
            } else {
                currentCoor.x = 5,
                currentCoor.y++
            }

            if (currentCoor.y > 19) currentCoor.y = 2

            console.log(new Date(currentCoor.date))
            const endDate: any = new Date()
            const startDate: any = new Date(currentCoor.date)
            console.log(Math.round(
                Math.abs(endDate - startDate) / 1000
            ))

            this.cacheManager.set("coor", JSON.stringify(currentCoor), {
                ttl: 1000 * 60 * 60
            })

            console.log("i want to make speed slow")
            this.server.emit("message", currentCoor)
        }, 800)

        setInterval( async (speed = "fast") => {
            const ss = await this.cacheManager.get("1")
            if (ss !== speed) return

            const currentCoor: any = JSON.parse(await this.cacheManager.get("coor"))
            if (!currentCoor) {
                currentCoor.x = 5,
                currentCoor.y = 1
            } else {
                currentCoor.x = 5,
                currentCoor.y++
            }

            if (currentCoor.y > 19) currentCoor.y = 2

            this.cacheManager.set("coor", JSON.stringify(currentCoor), {
                ttl: 1000 * 60 * 60
            })

            this.server.emit("message", currentCoor)
            console.log("i want to make speed fast")
        }, 400)

    }

    @SubscribeMessage('speed')
    async handleSpeed(@MessageBody() message: string) {
        this.cacheManager.set("1", message, {
            ttl: 1000 * 60 * 60
        })
    }
}