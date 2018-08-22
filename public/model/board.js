class Board{

  constructor(b,p){
    this.tiles = this.deserializeTiles(b.sB,b.nR,b.nC);
    this.players = [new Player(1,p==1),new Player(2,p==2)];
    this.startLine = new StartLine(this.players);

    G.adaptResolution();
    this.el = createSVG('svg');
    this.el.id = "board";
    this.el.addEventListener('mousemove',this.mmove);
    this.render();
  }

  changeView (x,y,w,h) { this.el.setAttribute("viewBox", `${x} ${y} ${w} ${h}`) }

  moveBoard (inc) { 
    const vb = this.el.viewBox.baseVal;
    this.el.setAttribute("viewBox", `${vb.x + inc} ${vb.y} ${vb.width} ${vb.height}`) 
  }

  draw(){
    const gameHeight = document.body.clientHeight > 450 ? 450 : document.body.clientHeight;
    this.tSize = gameHeight / 6;
    this.changeView(-this.tSize,0,G.screenWidth,gameHeight);
    this.el.appendChild(this.drawTiles(this.tiles,this.tSize));
    this.el.appendChild(this.startLine.render(this.tSize));
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
    G.board.moveBoard(3);
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