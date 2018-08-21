
function createSVG (el) { return document.createElementNS('http://www.w3.org/2000/svg',el)}

// Game data
class Game{
  constructor(socket){
    this.el = document.getElementById('game');
    this.body = document.body;
    this.state = 'intro';
    this.board = null;
    this.client = null;
    this.screenHeight = document.body.clientHeight;
    this.add(new Intro('connect',this.changeView).render());
    this.changeView(-40,-40,160,160);
  }

  add (el) { this.el.appendChild(el) }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  changeView (x,y,w,h) { this.el.setAttribute("viewBox", `${x} ${y} ${w} ${h}`) }

  resetView () { game.removeAttribute("viewBox") }

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
      G.clear();
      G.add(new Intro('wait').render());
    });

    socket.on("disconnect", () => {
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      G.clear();
      G.changeView(-40,-40,160,160);
      G.add(new Intro('wait').render());
    });

    socket.on("play", (data) => {
      G.board = new Board(data.sB, data.nR, data.nC);
      G.clear();
      G.resetView();
      G.add(G.board.render());
      document.body.onresize = function() {
        G.screenHeight = document.body.clientHeight;
        if(G.screenHeight >= 450) {
          G.el.setAttribute('style','height:450px;margin:"0 auto"');
          G.body.setAttribute('style','display:flex;align-items: center;"');
        }
        else{
          G.el.removeAttribute('style');
          G.body.removeAttribute('style');
        }
        G.board.refresh();
      };
    });
  }
}

class Board{

  constructor(sBoard,nRows,nCols){
    this.nRows = nRows;
    this.nCols = nCols;
    this.tiles = this.deserialize(sBoard,nRows,nCols);
    if(G.screenHeight >= 450) {
      G.el.setAttribute('style','height:450px;margin:"0 auto"');
      G.body.setAttribute('style','display:flex;align-items: center;"');
    }
    this.render();
  }

  render(){
    this.el = createSVG('svg');
    this.el.id = "board";
    this.el.appendChild(this.drawTiles(this.tiles));
    this.el.appendChild(new StartLine().render());
    this.el.addEventListener('mousemove',this.mmove);
    return this.el;
  }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  refresh(){
    this.clear();
    this.el.appendChild(this.drawTiles(this.tiles));
  }

  mmove(e){
    console.log(e)
  }

  drawTiles(tiles){
    let tArray = document.createDocumentFragment();
    for(let i=0;i<tiles.length;i++) tArray.appendChild(tiles[i].render());
    return tArray;
  }

  deserialize(sb,nR,nC){
    const b = sb.split(',');
    let t = []
    for (let i = 0; i < nR; i++) {
			for (let j = 0; j < nC; j++) {
				t[i * nC + j] = new Tile(i, j, b[i * nC + j]);
			}
    }
    return t;
  }

}

class Tile{

  constructor(x,y,v){
    this.x = x;
    this.y = y;
    this.value = v;
    this.selected = false;
    this.el = createSVG('g');
    this.el.addEventListener('click',this.select.bind(this));
    this.el.addEventListener('touchstart',this.select.bind(this));
    this.render();
  }

  select(){
    this.selected = !this.selected;
    this.el.children[0].setAttribute('fill',this.selected ? 'lightgreen' : 'gray')
    console.log(`${this.x} - ${this.y}`)
  }

  render(){
    const TILE_SIZE = (G.screenHeight >= 450 ? 450 : G.screenHeight) / 6;
    const HALF_TILE = TILE_SIZE / 2;
    this.el.innerHTML =  `<rect x=${this.x * TILE_SIZE} y=${this.y * TILE_SIZE} width=${TILE_SIZE} height=${TILE_SIZE} fill=${this.selected ? 'lightgreen' : 'gray'} stroke='white' stroke-width='6'/>
                          <text x=${this.x * TILE_SIZE + HALF_TILE} y=${this.y * TILE_SIZE + HALF_TILE} fill="white" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                            ${this.value}
                          </text>`;
    return this.el;
  }

}

class StartLine{
  constructor(){
    this.el = createSVG('g');
  }

  render(){
    const TILE_SIZE = (G.screenHeight >= 450 ? 450 : G.screenHeight) / 6;
    const HALF_TILE = TILE_SIZE / 2;
    let start = '';
    for(let i = 0; i<6; i++) start += `<rect x=${-1 * TILE_SIZE} y=${i * TILE_SIZE} width=${TILE_SIZE} height=${TILE_SIZE} fill='none' stroke='black' stroke-width='6'/>`;
    this.el.innerHTML = start;
    return this.el;
  }
}
