class Tile{

  constructor(x,y,v){
    this.x = x;
    this.y = y;
    this.value = v;
    this.selected = false;
    this.el = createSVG('g');
    this.el.addEventListener('click',this.select.bind(this));
    this.el.addEventListener('touchend',this.select.bind(this));
  }

  select(){
    this.selected = G.board.me.move({x:this.x,y:this.y});
    if(this.selected) {
      this.el.childNodes[0].setAttribute('fill','lightgreen');
      //G.board.animateBoardTo(this.x * this.tSize);
    }
  }

  render(tSize){
    this.tSize = tSize;
    this.el.innerHTML =  `<circle cx=${this.x * tSize + tSize/2} cy=${this.y * tSize + tSize/2} r=${tSize/3} stroke="gray" stroke-width="1.5" fill=${this.selected ? 'lightgreen' : 'none'} stroke-dasharray="4"/>
                          <text x=${this.x * tSize + tSize/2} y=${this.y * tSize + tSize/2} fill="black" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                            ${this.value}
                          </text>`;
    return this.el;
  }

}