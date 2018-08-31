class Tile{

  constructor(x,y,v){
    this.x = x;
    this.y = y;
    this.value = parseInt(v);
    this.selected = false;
    this.el = createSVG('g');
    this.el.addEventListener(G.isTouchDevice ? 'touchstart' : 'click',this.select.bind(this));
  }

  select(){
    this.selected = G.board.me.move({x:this.x,y:this.y});
    if(!this.selected) {
      this.el.childNodes[0].setAttribute('fill','red');
      setTimeout(() => this.el.childNodes[0].setAttribute('fill','none'),200)
    }
  }

  render(tSize){
    this.tSize = tSize;
    this.el.innerHTML =  `<circle cx=${this.x * tSize + tSize/2} cy=${this.y * tSize + tSize/2} r=${tSize/3} stroke="gray" stroke-width="1.5" fill="white" stroke-dasharray="4"/>
                          <text x=${this.x * tSize + tSize/2} y=${this.y * tSize + tSize/2} fill="black" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                            ${this.value}
                          </text>`;
    return this.el;
  }

}