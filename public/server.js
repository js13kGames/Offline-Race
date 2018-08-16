"use strict";

// Game server

console.log('Offline Race Server')

class GameServer {
	constructor(){
		this.games = [];
		this.users = [];
	}

	addUser(socket) {
		let findedRival = this.users.find((u) => !u.rival)
		const newUser = {id:socket.id, socket:socket , rival: findedRival ? findedRival : null};
		if(findedRival) {
			findedRival.rival = newUser;
			findedRival.socket.emit('play');
		}
		this.users.push(newUser);
		socket.emit(findedRival ? 'play' : 'wait');
	}

	remUser(socket) {
		const index = this.users.findIndex((u) => u.id == socket.id);
		if(index > -1){
			let currentRival = this.users[index].rival;
			if(currentRival){
				currentRival.rival = null;
				currentRival.socket.emit('wait');
			}
			this.users.splice(index, 1);
		}
	}
}

const gs = new GameServer();

module.exports = {
	// Socket connect event
	io: function (socket) {

		console.log(`USER CONNECTED ${socket.id}`);

		gs.addUser(socket);

		socket.on("disconnect", () => {
			gs.remUser(socket);
			console.log(`USER DISCONNECTED ${socket.id}`);
		});

	}
}