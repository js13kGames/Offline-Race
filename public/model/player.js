class Player{
  constructor(id,you){
    this.id = id;
    this.itsYou = you;
    this.path = [];
    this.currentPath = [];
    this.currentPos = {x:-1,y:(this.id == 1 ? 1 : 4)};
    this.el = createSVG('g');
  }

  add (el) { this.el.appendChild(el); }

  render(){
    return this.el;
  }

  renderInStart(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${-tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
    return this.el;
  }

  move(to){
    const lastMove = this.currentPath[this.currentPath.length - 2] ? this.currentPath[this.currentPath.length - 2] : null;
    if (allowMove(this.currentPos,to,lastMove)){

      const tS = G.board.tSize;
      let newLine = createSVG('line');
      newLine.setAttribute('x1', this.currentPos.x * tS + tS/2);
      newLine.setAttribute('y1', this.currentPos.y * tS + tS/2);
      newLine.setAttribute('x2', to.x * tS + tS/2);
      newLine.setAttribute('y2', to.y * tS + tS/2);
      newLine.setAttribute('style', 'stroke:red;stroke-width:2');
      this.add(newLine);

      this.currentPath.push(to);
      this.currentPos = to;
      return true;
    }
    return false;
  }
}