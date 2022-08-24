import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})
export class chatGateway {
    public test
    constructor() {
        this.test = false
    }
    @WebSocketServer()
    server

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        if (this.test) {
            console.log("false")
            return
        }
        this.test = true
        // this.server.emit("message", message)
    }
}