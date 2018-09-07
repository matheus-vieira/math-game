import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function Api() {
    return {
        on: (event, cb) => socket.on(event, cb),
        emit: (event, cb) => socket.emit(event, cb)
    };
}

const api = Api();
export { api };