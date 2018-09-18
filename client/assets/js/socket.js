function getSocket() {
    let socket = io();

    function on(event, callback) {
        socket.on(event, callback);
    }
    function emit(event, data) {
        socket.on(event, data || {});
    }

    socket.on('disconnect', () => console.log("disconnected"));

    return {
        on: on,
        emit: emit
    }
}