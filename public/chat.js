let socket = io();
let userName;

Swal.fire({
    title: "Write your name",
    input: "text",
    inputValidator: value => !value && 'please write your name',
    allowOutsideClick: false
}).then((res)=> {
    userName = res.value
    document.getElementById('username').innerHTML = userName
    socket.emit('auth', userName)
    //console.log(userName)
    })

let chatBox = document.getElementById('chatbox')
chatBox.addEventListener('keyup', send)

function send(e){
    if(e.key === 'Enter'){
        //console.log(chatBox.value)
        socket.emit('new_message', {
            userName,
            message: chatBox.value
        })
    }
}
socket.on('all_messages', data => {
    document.getElementById('messages').innerHTML = data.map(
        message => `<br><b>${message.userName}</b>: ${message.message}`).join('')
})