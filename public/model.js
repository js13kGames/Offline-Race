// Game data

class Game{
  constructor(socket){
    this.state = 'intro';
    this.board = null;
    this.client = null;
    UI.changeScene(new Intro('connect').render());
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
      UI.changeScene(new Intro('wait').render());
    });

    socket.on("disconnect", () => {
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      UI.changeScene(new Intro('wait').render());
    });

    socket.on("play", (data) => {
      G.board = new Board(data.sB, data.nR, data.nC);
      UI.resetView();
      UI.changeScene(G.board.render());
      document.body.onresize = function() {G.board.refresh()};
    });
  }
}

class Tile{
  constructor(x,y,v){
    this.x = x;
    this.y = y;
    this.value = v;
    this.render();
  }

  render(){
    const TILE_SIZE = document.body.clientHeight / 6;
    const HALF_TILE = TILE_SIZE / 2;
    return  `<g>
              <rect x=${this.x * TILE_SIZE} y=${this.y * TILE_SIZE} width=${TILE_SIZE} height=${TILE_SIZE} fill='gray' stroke='white' stroke-width='6'/>
              <text x=${this.x * TILE_SIZE + HALF_TILE} y=${this.y * TILE_SIZE + HALF_TILE} fill="white" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                ${this.value}
              </text>
            </g>`
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
    return  `<svg id="board" onmousemove="G.board.mmove()">${this.drawTiles(this.tiles)}</svg>
             <svg id="fix"></svg>`
  }

  refresh(){
    const board = document.getElementById('board');
    board.innerHTML = this.drawTiles(this.tiles);
  }

  mmove(e){
    console.log(e)
  }

  drawTiles(tiles){
    let strTiles = '';
    tiles.forEach(function(t) {
      const pos = t.split;
      strTiles += t.render();
    });
    return strTiles;
  }

  deserialize(sb,nR,nC){
    const b = sb.split(',');
    let t = []
    for (let i = 0; i < nR; i++) {
			for (let j = 0; j < nC; j++) {
				t[i * nC + j] = new Tile(i, j, b[i * nC + j]) // { i, j, v: b[i * nC + j] };
			}
    }
    return t;
  }

}