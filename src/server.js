import server from "./app.js"
import { Server } from "socket.io"

let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

let http_server = server.listen(PORT, ready)

let socket_server = new Server(http_server)
const chats = []
socket_server.on('connection',
    socket => {
        console.log(socket.client.id)
        socket.on('auth', () => {
            socket_server.emit('all_messages', chats)
        })
        socket.on('new_message', data => {
            chats.push(data)
            console.log(chats)
            socket_server.emit('all_messages', chats)
        })
    })
