module.exports = (io, socket) => {
    const joinRoom = (payload) => {
        console.log(payload, 'joinRoom');

        socket.join('some-room');
        socket.to('some-room').emit('Pesan Baru', payload.msg);
    }

    const sendChat = (payload) => {
        console.log(payload, 'sendChat');
    }

    socket.on('chat:joinRoom', joinRoom);
    socket.on('chat:sendChat', sendChat);

}