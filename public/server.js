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
		if(findedRival) {
			this.users.push({id:socket.id, socket:socket , rival:findedRival.socket});
			findedRival.rival = socket;
			findedRival.socket.emit('play');
		}
		else this.users.push({id:socket.id, socket:socket , rival:null});
		socket.emit(findedRival ? 'play' : 'wait');
	}

	remUser(socket) {
		const index = this.users.findIndex((u) => u.id == socket.id);
		if(index > -1){
			let currentRival = this.users[index].rival;
			console.log(currentRival)
			if(currentRival){
				currentRival.rival = null;
				currentRival.socket.emit('wait');
			}
			this.users.splice(index, 1);
		}
		//socket.emit('wait');
	}
}

const gs = new GameServer();

module.exports = {
	// Socket connect event
	io: function (socket) {
		console.log(`USER CONNECTED ${socket.id}`);
		gs.addUser(socket);
		console.log(gs.users)
		socket.on("disconnect", () => {
			gs.remUser(socket);
			console.log(`USER DISCONNECTED ${socket.id}`);
		});
	}
}