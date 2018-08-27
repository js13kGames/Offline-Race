class Player{
  constructor(id,you){
    this.id = id;
    this.itsYou = you;
    this.path = [];
    this.currentPath = [{x:-1,y:(this.id == 1 ? 1 : 4)}];
    this.currentPos = {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.el = createSVG('g');
  }

  add (el) { this.el.appendChild(el); }

  render(){
    let tArray = document.createDocumentFragment();
    for(let i=1;i<this.currentPath.length;i++) tArray.appendChild(this.line(this.currentPath[i-1],this.currentPath[i],G.board.tSize));
    return tArray;
  }

  renderInStart(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${-tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
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
    fill.setAttribute('style', 'stroke:red;stroke-width:3;');
    let stroke = createSVG('line');
    stroke.setAttribute('x1', p1.x * tS + tS/2);
    stroke.setAttribute('y1', p1.y * tS + tS/2);
    stroke.setAttribute('x2', p2.x * tS + tS/2);
    stroke.setAttribute('y2', p2.y * tS + tS/2);
    stroke.setAttribute('stroke-linecap', 'round');
    stroke.setAttribute('style', 'stroke:black;stroke-width:5;');
    connector.appendChild(fill);
    connector.appendChild(stroke);
    return connector;
  }

  move(to){
    const lastMove = this.currentPath[this.currentPath.length - 2] ? this.currentPath[this.currentPath.length - 2] : null;
    if (allowMove(this.currentPos,to,lastMove)){

      const tS = G.board.tSize;

      this.add(this.line(this.currentPos,to,tS));

      const incX = to.x - this.currentPos.x;

      if (this.currentPos.x*tS > G.screenWidth/2 + G.board.offsetX - tS && this.currentPos.x*tS < G.screenWidth/2 + tS + G.board.offsetX &&  (incX != 0)) {
        G.board.drawNextTiles(tS,G.board.offsetX + (incX * tS));
        G.board.animateBoardTo(G.board.offsetX + (incX * tS));
      }

      this.currentPath.push(to);
      this.currentPos = to;


      return true;
    }
    return false;
  }
}