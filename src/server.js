import server from "./app.js"
import { Server } from "socket.io"

let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

socket_server.on(
    'connection',
    socket => {
        console.log(`client ${socket.client.id} connected`)
        socket.on(
            '1connection',
            data => {
                console.log(data.name)
            }
        )
    }
)
