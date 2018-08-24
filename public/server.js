"use strict";

// Game server

const DIM_ROWS = 100;
const DIM_COLS = 6;

class Game {
	constructor(id,p1,p2){
		this.id = id;
		this.player1 = p1;
		this.player2 = p2;
		this.serializedBoard = "";
		this.board = this.createMatrix();
	}

	createMatrix() {
		this.serializedBoard = "";
		let m = [];
		for (let i = 0; i < DIM_ROWS; i++) {
			for (let j = 0; j < DIM_COLS; j++) {
				const value = Math.floor(Math.random() * 9) + 1;
				this.serializedBoard += `${value},`
				m[i * DIM_COLS + j] = { i, j, v: value };
			}
		}
		this.serializedBoard.slice(this.serializedBoard.length - 1 ,1);
		return m;
	}
}

class GameServer {
	constructor(){
		this.games = [];
		this.users = [];
		this.gamesCreated = 0;
	}

	addUser(socket) {
		let findedRival = this.users.find((u) => !u.rival)
		const newUser = {id:socket.id, socket:socket , rival: findedRival ? findedRival : null};
		if(findedRival) {
			findedRival.rival = newUser;
			const board = this.createGame(newUser,findedRival);
			const sendBoard = {sB:board, nR:DIM_ROWS, nC:DIM_COLS};
			findedRival.socket.emit('play',{board: sendBoard, player: 1});
			socket.emit('play',{board: sendBoard, player: 2});
		}
		else socket.emit('wait');
		this.users.push(newUser);
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

	createGame(p1,p2) {
		const newGame = new Game(this.gamesCreated,p1,p2);
		this.games.push(newGame);
		this.gamesCreated ++;
		return newGame.serializedBoard;
	}
}

const gs = new GameServer();

module.exports = {
	io: function (socket) {
		gs.addUser(socket);
		socket.on("disconnect", () => {
			gs.remUser(socket);
		});
	}
}