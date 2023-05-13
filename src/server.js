import server from "./app.js"
import { Server } from "socket.io"

let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)
