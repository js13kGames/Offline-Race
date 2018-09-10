"use strict";

// Game server

const DIM_ROWS = 16;
const DIM_COLS = 6;

class Game {
	constructor(p1,p2,id){
		this.id = id;
		this.players = [p1,p2];
		this.serializedBoard = "";
		this.numbers = [];
		this.board = this.createMatrix();
		this.finalNumber = Math.floor(Math.random() * 9) + 1;
		this.timer = null;
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

	getNumber(event,pId,path){
		console.log(new Date().toISOString() + ' -- ' +event);
		console.log(Date.now())
		const number = Math.floor(Math.random() * 20) + 10;
		this.numbers.push(number);
		const numberId = this.numbers.length-1;
		this.players.forEach((p)=> p.socket.emit(event,{i: numberId,n:number},pId,path));
		if(event == 'next') clearTimeout(this.timer);
		this.timer = setTimeout(()=>this.getNumber('timeout',numberId),30000);
	}

	checkPath(path,pId){
		let player = this.players[pId];
		let sum = 0;
		const mustSum = this.numbers[this.numbers.length-1];
		for(let i=1;i<path.length;i++){
			const tile = this.board[(path[i].x * DIM_COLS) + path[i].y];
      sum += tile.v;
		}
		if(sum == mustSum){
			this.getNumber('next',pId,path);
		}
	}

	checkFinish(path,pId){
		let player = this.players[pId];
		let sum = this.finalNumber;
		const mustSum = this.numbers[this.numbers.length-1];
		for(let i=1;i<path.length;i++){
			const tile = this.board[(path[i].x * DIM_COLS) + path[i].y];
      sum += tile.v;
		}
		if(sum == mustSum){
			this.players.forEach((p)=> p.socket.emit('finish',pId,path));
		}
	}

}

class GameServer {
	constructor(){
		this.games = [];
		this.users = [];
		this.gamesCreated = 0;
	}

	addUser(socket) {
		let findedRival = this.users.find((u) => !u.rival);
		const newUser = {id:socket.id, socket:socket , rival: findedRival ? findedRival : null, game: null, numPlayer: findedRival ? 2 : 1};
		if(findedRival) {
			findedRival.rival = newUser;
			const board = this.createGame(findedRival,newUser);
			const sendBoard = {sB:board.sB, fN:board.fN, nR:DIM_ROWS, nC:DIM_COLS};
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
				if(currentRival.game) this.deleteGame(currentRival.game.id);
			}
			this.users.splice(index, 1);
		
		}
	}

	createGame(p1,p2) {
		const newGame = new Game(p1,p2,this.games.length);
		this.games.push(newGame);
		p1.game = newGame;
		p2.game = newGame;
		return {sB: newGame.serializedBoard, fN: newGame.finalNumber};
	}

	deleteGame(id){
		const index = this.games.findIndex((g) => g.id == id);
		if(index > -1){
			clearTimeout(this.games[index].timer);
			delete this.games[index];
			this.games[index] = null;	
			this.games.splice(index, 1);
			console.log(this.games)
		}
	}

	userReady(socket) {
		let user = this.users.find((u) => u.id == socket.id);
		user.ready = true;
		if(user.rival && user.rival.ready) {
			user.game.getNumber('start');
		}
	}

	checkPath(socket,p) {
		let user = this.users.find((u) => u.id == socket.id);
		user.game.checkPath(p,user.numPlayer);
	}

	checkFinish(socket,p) {
		let user = this.users.find((u) => u.id == socket.id);
		user.game.checkFinish(p,user.numPlayer);
	}
}

const gs = new GameServer();

module.exports = {
	io: function (socket) {
		gs.addUser(socket);
		socket.on("disconnect", () => {
			gs.remUser(socket);
		});

		socket.on("ready", () => {
			gs.userReady(socket);
		});

		socket.on("path", (p) => {
			gs.checkPath(socket,p);
		});

		socket.on("finish", (p) => {
			gs.checkFinish(socket,p);
		});
	}
}