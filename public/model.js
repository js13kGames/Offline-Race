// Game data

class Game{
  constructor(socket){
    this.state = 'intro';
    this.board = null;
    this.client = null;
  }

  initGame(){
    this.client = new GameClient();
    this.state = 'connected';
  }
}

class GameClient {
  constructor(){
    // Connecting to sockets server
    this.socket = io();
    this.initializeEvents(this.socket);
  }

  initializeEvents(socket){
    socket.on("connect", () => {
      UI.setMessage('wait')
    });

    socket.on("disconnect", () => {
      UI.setMessage('Offline Race Client')
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      UI.setMessage('wait')
      UI.clearBoard();
    });

    socket.on("play", (data) => {
      G.board = new Board(data.sB, data.nR, data.nC);
      UI.drawBoard(G.board.tiles);
      UI.setMessage('play');
    });
  }
}

class Board{
  constructor(sBoard,nRows,nCols){
    this.nRows = nRows;
    this.nCols = nCols;
    this.tiles = this.deserialize(sBoard,nRows,nCols);
  }

  deserialize(sb,nR,nC){
    const b = sb.split(',');
    let t = []
    for (let i = 0; i < nR; i++) {
			for (let j = 0; j < nC; j++) {
				t[i * nC + j] = { i, j, v: b[i * nC + j] };
			}
    }
    return t;
  }

}