import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Socket } from 'socket.io';
import { FallenCubesService } from "./fallen_cubes/fallen_cubes.service";

@WebSocketGateway({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
export class chatGateway {
    public shapes
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly fallenCubesServiceService: FallenCubesService
    ) {
        this.shapes = {
            "L": {
                name: "L",
                rotations: {
                    "topRight": false,
                    "downRight": false,
                    "downLeft": true,
                    "topLeft": false
                }
            },
            "T": {
                name: "T",
                rotations: {
                    "centerTop": true,
                    "centerRight": false,
                    "centerDown": true,
                    "centerLeft": false
                }
            },
            "LT": {
                name: "LT",
                rotations: {
                    "top": "top",
                    "right": "right",
                    "down": "down",
                    "left": "left"
                }
            },
            "ZL": {
                name: "ZL",
                rotations: {
                    left: true,
                    top: false
                }
            },
            "ZR": {
                name: "ZR",
                rotations: {
                    right: true,
                    top: false
                }
            }
        }

        // console.log("set default speed")
        this.cacheManager.set("1", "slow", {
            ttl: 1000 * 60 * 60
        })

        this.cacheManager.set("coor", JSON.stringify({
            x: 5,
            y: 2,
            date: new Date(),
            filledHome: []
        }), {
            ttl: 1000 * 60 * 60
        })
    }
    @WebSocketServer()
    server

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() message: string) {
        console.log("CALLED")
        let slowSpeed

        slowSpeed = setInterval(async (speed = "slow", coor = { x: 5, y: 2 }) => {
            const ss = await this.cacheManager.get("1")
            if (ss !== speed) return

            const currentCoor: any = JSON.parse(await this.cacheManager.get("coor"))

            const currentRotationName = this.fallenCubesServiceService.getCurrentShapeRotaion(this.shapes.L.rotations)
            // console.log(this.fallenCubesServiceService.getShapePoints(this.shapes.L.name, 2, currentCoor, currentRotationName))
            
            currentCoor.called = true
            if (!currentCoor) {
                currentCoor.x = 5,
                currentCoor.y = 2
            } else {
                currentCoor.x = 5,
                currentCoor.y++
            }

            if (currentCoor.y > 19) {
                currentCoor.y = 2
                // get filled homes
                currentCoor.y--
                console.log(this.fallenCubesServiceService.getShapePoints(this.shapes.L.name, 2, 
                    {
                        x: currentCoor.x,
                        y: 19
                    }, currentRotationName))
            }
            
            // check if shape come here shape points not filled cubes 

            // ======================================================== GET SECONDS
            // const endDate: any = new Date()
            // const startDate: any = new Date(currentCoor.date)
            // console.log(Math.round(
            //     Math.abs(endDate - startDate) / 1000
            // ))

            this.cacheManager.set("coor", JSON.stringify(currentCoor), {
                ttl: 1000 * 60 * 60
            })

            console.log("i want to make speed slow")
            this.server.emit("message", currentCoor)
            // clearInterval(slowSpeed)
        }, 800)

        setInterval(async (speed = "fast") => {
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