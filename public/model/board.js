class Board{

  constructor(b,p){
    this.tiles = this.deserializeTiles(b.sB,b.nR,b.nC);
    this.players = [new Player(1,p==1),new Player(2,p==2)];
    this.me = this.players.find((p) => p.itsYou);
    this.startLine = new StartLine(this.players);
    this.offsetX = 0;
    G.adaptResolution();
    this.el = createSVG('svg');
    this.el.id = "board";
    this.el.addEventListener('mousemove',this.mmove);
    this.render();
  }

  changeView (x,y,w,h) { this.el.setAttribute("viewBox", `${x} ${y} ${w} ${h}`) }

  moveBoard (inc) {
    const vb = this.el.viewBox.baseVal;
    this.offsetX += inc;
    this.el.setAttribute('viewBox', `${this.offsetX} ${vb.y} ${vb.width} ${vb.height}`)
  }

  animateBoardTo(pos) {
    let self = this;
    if(this.offsetX != pos){
       setTimeout(function() {
        requestAnimationFrame(() => self.animateBoardTo(pos));
        const dist = pos - self.offsetX;
        const inc = dist > 200 ? 10 : dist > 120 ? 8 : dist > 4 ? 4 : dist < 1 ? pos - self.offsetX : 1;
        console.log(dist);
        self.moveBoard(inc);
      }, 1000 / 30);
    }
  }

  draw(){
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    this.el.appendChild(this.drawTiles(this.tiles,this.tSize));
    this.el.appendChild(this.startLine.render(this.tSize));
    //this.drawPlayers(this.tSize);
  }

  render(){
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    this.offsetX = -this.tSize;
    this.changeView(this.offsetX,0,G.screenWidth,gameHeight);
    this.draw();
    return this.el;
  }

  refresh(){
    //TODO: el offset debe ir en funcion de la tSize
    this.clear();
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.changeView(this.offsetX,0,G.screenWidth,gameHeight);
    this.draw();
  }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  mmove(e){
   // G.board.moveBoard(5);
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