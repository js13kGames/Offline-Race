class Player{
  constructor(id,you,tSize){
    this.id = id;
    this.itsYou = you;
    const initPos = {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.path = [initPos];
    this.currentPath = [initPos];
    this.currentPos = initPos;
    if(you){
      document.addEventListener("keydown", (e) => {if(e.keyCode==13)this.sendPath()}, false);
      document.addEventListener("keydown", (e) => {if(e.keyCode==46)this.clearPath()}, false);

      document.addEventListener("touchstart", (e) => {
        const posI = e.touches[0].clientX;
        let doThis = function(posI,e){
          if(e.changedTouches[0].clientX - posI > 50) this.sendPath();
          else if(e.changedTouches[0].clientX - posI < -50) this.clearPath();
          document.removeEventListener("touchend", doT, false);
        }
        let doT = doThis.bind(this,posI);
        document.addEventListener("touchend", doT, false);
      },false);
    }
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
    if(this.currentPath.length > 2 || this.path.length > 1){
      if(this.currentPath.length > 1) this.connector.move(this.currentPath[this.currentPath.length-2],this.currentPath[this.currentPath.length-1],tSize);
      else this.connector.move(this.path[this.path.length-2],this.path[this.path.length-1],tSize);
    }

    this.add(tArray);
    return this.el;
  }

  line(p1,p2,tS){
    let connector = document.createDocumentFragment();
    let stroke = createSVG('line');
    stroke.set([['x1', p1.x * tS + tS/2],['y1', p1.y * tS + tS/2],['x2', p2.x * tS + tS/2],['y2', p2.y * tS + tS/2],['stroke-linecap', 'round'],['style', `stroke:${this.itsYou?'green':'red'};stroke-width:6;stroke-opacity:.4;`],['pointer-events','none']]);
    connector.appendChild(stroke);
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

  preValidateFinish(p,n,fN){
    let sum = 0;
    for(let i=1;i<p.length;i++){
      const tile = G.board.tiles[(p[i].x * G.board.nCols) + p[i].y];
      sum += tile.value;
    }
    sum += fN;
    if(sum == n) return true;
    else return false;
  }

  sendPath(){
    if (this.preValidatePath(this.currentPath,G.numberToGet)) G.client.socket.emit('path',this.currentPath);
    else G.showMsg('sumKO','INCORRECT','red');
  }

  clearPath(){
    const lon = this.path.length
    this.currentPos = lon > 0 ? this.path[lon-1] : {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.currentPath = [this.currentPos];
    G.board.animateBoardTo(this.currentPos.x * G.board.tSize - G.screenWidth/2);
    this.render(G.board.tSize);
  }

  finish(nR,fN){
    if(this.currentPos.x == nR-1){
      if (this.preValidateFinish(this.currentPath,G.numberToGet,fN)) G.client.socket.emit('finish',this.currentPath);
      else G.showMsg('sumKO','INCORRECT','red');
    }
    else G.showMsg('sumKO','SORRY U Cant finish','red');
  }

  numberGetted(pId,path){
    if(this.id == pId){
      if(!this.itsYou) {
        this.path = this.path.concat(path);
      }else{
        this.path = this.path.concat(this.currentPath);
        this.currentPath = [this.currentPos];
        G.showMsg('sumOK','WELL DONE !!','green');
      }
      this.render(G.board.tSize);
    }
    else{
      if(this.itsYou){
        this.clearPath();
      }
    }
  }
}