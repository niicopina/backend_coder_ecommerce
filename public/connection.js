const socket = io()

socket.emit(
    '1connection',
    {
        name: 'Nico',
        age: 27
    }
)