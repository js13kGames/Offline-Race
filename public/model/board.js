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