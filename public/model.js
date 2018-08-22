
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
    this.screenWidth = document.body.clientWidth;
    this.add(new Intro('connect').render());
    this.changeView(-40,-40,160,160);
  }

  add (el) { this.el.appendChild(el) }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  changeView (x,y,w,h) { this.el.setAttribute("viewBox", `${x} ${y} ${w} ${h}`) }

  resetView () { game.removeAttribute("viewBox") }

  adaptResolution (){
    if(G.screenHeight >= 450 && this.state == 'play') {
      G.el.setAttribute('style','height:450px;margin:"0 auto"');
      G.body.setAttribute('style','display:flex;align-items: center;"');
    }
    else{
      G.el.removeAttribute('style');
      G.body.removeAttribute('style');
    }
  }

  refresh () {
    G.screenHeight = document.body.clientHeight;
    G.screenWidth = document.body.clientWidth;
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.adaptResolution();
    G.board.refresh();
  }

  initGame(){
    this.client = new GameClient();
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
      G.state = 'wait';
      G.clear();
      G.add(new Intro('wait').render());
    });

    socket.on("disconnect", () => {
      G.state = 'intro';
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      document.body.onresize = null;
      G.state = 'wait';
      G.clear();
      G.changeView(-40,-40,160,160);
      G.add(new Intro('wait').render());
    });

    socket.on("play", (data) => {
      G.state = 'play';
      G.clear();
      G.board = new Board(data.board,data.player);
      G.add(G.board.render());
      document.body.onresize = () => G.refresh();
    });
  }
}

class Board{

  constructor(b,p){
    // this.nRows = nRows;
    // this.nCols = nCols;
    this.tiles = this.deserializeTiles(b.sB,b.nR,b.nC);
    this.players = [new Player(1,p==1),new Player(2,p==2)];
    this.startLine = new StartLine(this.players);

    G.adaptResolution();
    this.el = createSVG('svg');
    this.el.id = "board";
    this.el.addEventListener('mousemove',this.mmove);
    this.render();
  }

  draw(){
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    G.changeView(-this.tSize,0,G.screenWidth,gameHeight);
    this.el.appendChild(this.drawTiles(this.tiles,this.tSize));
    G.add(this.startLine.render(this.tSize));
    //this.drawPlayers(this.tSize);
  }

  render(){
    this.draw();
    return this.el;
  }

  refresh(){
    this.clear();
    this.draw();
  }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  mmove(e){
    //console.log(e)
  }

  drawTiles(tiles,tSize){
    let tArray = document.createDocumentFragment();
    for(let i=0;i<tiles.length;i++) tArray.appendChild(tiles[i].render(tSize));
    return tArray;
  }

  drawPlayers(tSize){
    let pArray = document.createDocumentFragment();
    for(let i=0; i<this.players.length; i++) pArray.appendChild(this.players[i].render(tSize));
    this.el.appendChild(pArray);
  }

  deserializeTiles(sb,nR,nC){
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
  }

  select(){
    this.selected = !this.selected;
    this.el.children[0].setAttribute('fill',this.selected ? 'lightgreen' : 'gray')
    console.log(`${this.x} - ${this.y}`)
  }

  render(tSize){
    this.el.innerHTML =  `<rect x=${this.x * tSize} y=${this.y * tSize} width=${tSize} height=${tSize} fill=${this.selected ? 'lightgreen' : 'gray'} stroke='black' stroke-width='6'/>
                          <text x=${this.x * tSize + tSize/2} y=${this.y * tSize + tSize/2} fill="white" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                            ${this.value}
                          </text>`;
    return this.el;
  }

}

class StartLine{
  constructor(players){
    this.el = createSVG('g');
    this.players = players;
  }

  render(tSize){
    let start = document.createDocumentFragment();
    for(let i=0; i<this.players.length; i++) start.appendChild(this.players[i].renderInStart(tSize));
    this.el.appendChild(start);

    //let start = '';
    // for(let i = 0; i<6; i++) start += `<rect x=${-1 * tSize + 5} y=${i * tSize + 5} width=${tSize - 10} height=${tSize - 10} fill='none' stroke='black' stroke-width='2'/>`;
    // for(let i = 0; i<2; i++) this.players[i]
    // this.el.innerHTML = start;
    return this.el;
  }
}

class Player{
  constructor(id,you){
    this.id = id;
    this.itsYou = you;
    this.path = [];
    this.el = createSVG('g');
  }

  render(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
    return this.el;
  }

  renderInStart(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${-tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
    return this.el;
  }
}
