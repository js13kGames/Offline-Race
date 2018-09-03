class Board{

  constructor(b,p){
    this.nCols = b.nC;
    this.nRows = b.nR;
    this.tiles = this.deserializeTiles(b.sB,b.nR,b.nC);
    this.players = [new Player(1,p==1),new Player(2,p==2)];
    this.me = this.players.find((p) => p.itsYou);
    this.offsetX = 0;
    this.numColsDisplay = 0;
    this.animating = false;
    G.adaptResolution();
    this.el = createSVG('svg');
    this.el.id = "board";
  }

  changeView (x,y,w,h) { this.el.set([["viewBox", `${x} ${y} ${w} ${h}`]]) }

  moveBoard (inc) {
    const vb = this.el.viewBox.baseVal;
    this.offsetX += inc;
    this.changeView(this.offsetX, vb.y, vb.width, vb.height)
  }

  animateBoardTo(pos){
    const self = this;
    if(!this.animating) this.animateBoardToLoop(pos);
    else setTimeout(() => self.animateBoardTo(pos),200);
  }

  animateBoardToLoop(pos) {
    let self = this;
    this.animating = true;
    if(this.offsetX != pos){
       setTimeout(function() {
        requestAnimationFrame(() => self.animateBoardToLoop(pos));
        const dist = pos - self.offsetX;
        const distAbs = Math.abs(dist);
        const dir = distAbs / dist;
        const inc = (distAbs > 120 ? 8 : distAbs > 20 ? 5 : distAbs > 3 ? 3 : distAbs < 1 ? distAbs : 1) * dir;
        self.moveBoard(inc);
      }, 1000 / 30);
    }
    else this.animating = false;
  }

  draw(tS){
    this.el.appendChild(this.drawTiles(this.tiles,tS));
    this.drawPlayers(tS);
    this.el.appendChild(new EndLine().render())
  }

  render(){
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    this.offsetX = -this.tSize;
    this.changeView(this.offsetX,0,G.screenWidth,gameHeight);
    this.draw(this.tSize);
    return this.el;
  }

  refresh(){
    this.clear();
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    if(this.me) this.offsetX = this.me.currentPos.x * this.tSize - G.screenWidth/2;
    this.changeView(this.offsetX,0,G.screenWidth,gameHeight);
    this.draw(this.tSize);
  }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  drawTiles(tiles,tSize){
    this.numColsDisplay = parseInt((G.screenWidth + this.offsetX + tSize) / tSize);
    if(this.numColsDisplay > this.nRows) this.numColsDisplay = this.nRows;
    const tilesFit = this.numColsDisplay * 6;
    let tArray = document.createDocumentFragment();
    for(let i=0;i<tilesFit;i++) tArray.appendChild(tiles[i].render(tSize));
    return tArray;
  }

  drawNextTiles(tSize,nextOffset){
    let nextColsDisplay = parseInt((G.screenWidth + nextOffset + tSize) / tSize);
    if(this.numColsDisplay < nextColsDisplay && nextColsDisplay < this.nRows){
      let tArray = document.createDocumentFragment();
      for(let i=(this.numColsDisplay-1) * 6;i<nextColsDisplay * 6;i++) tArray.appendChild(G.board.tiles[i].render(tSize));
      this.el.insertBefore(tArray,this.el.childNodes[0]);
    }
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