// Game data

class Game{
  constructor(socket){
    this.state = 'intro';
    this.board = null;
    this.client = null;
    UI.changeScene(new Intro().render());
  }

  initGame(){
    this.client = new GameClient();
    this.state = 'connected';
    console.log('conn')
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
      //UI.setMessage('wait')
    });

    socket.on("disconnect", () => {
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      console.log('wait');
    });

    socket.on("play", (data) => {
      G.board = new Board(data.sB, data.nR, data.nC);
      UI.resetView();
      UI.changeScene(G.board.render());
    });
  }
}

class Board{

  constructor(sBoard,nRows,nCols){
    this.nRows = nRows;
    this.nCols = nCols;
    this.tiles = this.deserialize(sBoard,nRows,nCols);
    this.render();
  }

  render(){
    return  `<svg id="board">${this.drawTiles(this.tiles)}</svg>
             <svg id="fix"></svg>`
  }

  drawTiles(tiles){
    const TILE_SIZE = document.body.clientHeight / 6;
    const HALF_TILE = TILE_SIZE / 2;
    let strTiles = '';
    tiles.forEach(function(t) {
      const pos = t.split;
      strTiles +=
        `<g>
          <rect x=${t.i * TILE_SIZE} y=${t.j * TILE_SIZE} width=${TILE_SIZE} height=${TILE_SIZE} fill='gray' stroke='white' stroke-width='2'/>
          <text x=${t.i * TILE_SIZE + HALF_TILE} y=${t.j * TILE_SIZE + HALF_TILE} fill="white" font-size="4vh" text-anchor="middle" alignment-baseline="central">
            ${t.v}
          </text>
        </g>`
    });
    return strTiles;
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