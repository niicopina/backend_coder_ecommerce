import server from "./app.js"
import { Server } from "socket.io"
import { connect } from "mongoose"

const port = process.env.PORT || 8000
const ready = () => {
    console.log('server ready on port '+ port)
    connect(process.env.LINK_MONGO)
        .then(()=> console.log('connected to database'))
        .catch(err=>console.log(err))
}
//server.listen(port, ready)

let http_server = server.listen(port, ready)

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
