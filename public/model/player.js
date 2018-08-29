class Player{
  constructor(id,you,tSize){
    this.id = id;
    this.itsYou = you;
    const initPos = {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.path = [initPos];
    this.currentPath = [initPos];
    this.currentPos = initPos;
    if(you) document.addEventListener("keydown", (e) => {if(e.keyCode==13)this.sendPath()}, false);
    if(you) document.addEventListener("keydown", (e) => {if(e.keyCode==46)this.clearPath()}, false);
    this.connector = new Connector(this.itsYou);
    this.el = createSVG('g');
  }

  add (el) { this.el.appendChild(el); }

  render(tSize){
    this.el.innerHTML = '';
    let tArray = document.createDocumentFragment();
    for(let i=1;i<this.path.length;i++) tArray.appendChild(this.line(this.path[i-1],this.path[i],tSize));
    for(let i=1;i<this.currentPath.length;i++) tArray.appendChild(this.line(this.currentPath[i-1],this.currentPath[i],tSize));
    this.add(this.connector.render(this.currentPos,tSize));
    this.add(tArray);
    return this.el;
  }

  line(p1,p2,tS){
    let connector = document.createDocumentFragment();
    let fill = createSVG('line');
    fill.setAttribute('x1', p1.x * tS + tS/2);
    fill.setAttribute('y1', p1.y * tS + tS/2);
    fill.setAttribute('x2', p2.x * tS + tS/2);
    fill.setAttribute('y2', p2.y * tS + tS/2);
    fill.setAttribute('stroke-linecap', 'round');
    fill.setAttribute('style', `stroke:${this.itsYou?'green':'red'};stroke-width:3;`);
    let stroke = createSVG('line');
    stroke.setAttribute('x1', p1.x * tS + tS/2);
    stroke.setAttribute('y1', p1.y * tS + tS/2);
    stroke.setAttribute('x2', p2.x * tS + tS/2);
    stroke.setAttribute('y2', p2.y * tS + tS/2);
    stroke.setAttribute('stroke-linecap', 'round');
    stroke.setAttribute('style', 'stroke:black;stroke-width:6;');
    connector.appendChild(stroke);
    connector.appendChild(fill);
    return connector;
  }

  move(to){
    const lastMove = this.currentPath[this.currentPath.length - 2] ? this.currentPath[this.currentPath.length - 2] : null;
    if (allowMove(this.currentPos,to,lastMove)){

      const tS = G.board.tSize;

      this.add(this.line(this.currentPos,to,tS));
      this.connector.move(this.currentPos,to,tS);

      const incX = to.x - this.currentPos.x;

      if ((incX != 0) && this.currentPos.x*tS > G.screenWidth/2 + G.board.offsetX - tS && this.currentPos.x*tS < G.screenWidth/2 + tS + G.board.offsetX) {
        G.board.drawNextTiles(tS,G.board.offsetX + (incX * tS));
        G.board.animateBoardTo(G.board.offsetX + (incX * tS));
      }

      this.currentPath.push(to);
      this.currentPos = to;

      return true;
    }
    return false;
  }

  preValidatePath(p,n){
    let sum = 0;
    for(let i=1;i<p.length;i++){
      const tile = G.board.tiles[(p[i].x * G.board.nCols) + p[i].y];
      sum += tile.value;
    }
    if(sum == n) return true;
    else return false;
  }

  sendPath(){
    //const cP = this.currentPath.filter((p) => p.x != -1);
    if (this.preValidatePath(this.currentPath,G.numberToGet)) G.client.socket.emit('path',this.currentPath);
    else console.log('NOOOOOOOOO');
  }

  clearPath(){
    const lon = this.path.length
    this.currentPos = lon > 0 ? this.path[lon-1] : {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.currentPath = [this.currentPos];
    this.render(G.board.tSize);
  }

  numberGetted(pId,path){
    if(this.id == pId){
      this.path = this.path.concat(this.currentPath);
      this.currentPath = [this.currentPos];
      if(!this.itsYou) this.path = this.path.concat(path);
      this.render(G.board.tSize);
    }
    else{
      if(this.itsYou){ 
        this.clearPath();
      }
    }
  }
}