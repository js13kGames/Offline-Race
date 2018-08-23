class Tile{

  constructor(x,y,v){
    this.x = x;
    this.y = y;
    this.value = v;
    this.selected = false;
    this.el = createSVG('g');
    this.el.addEventListener('click',this.select.bind(this));
    this.el.addEventListener('touchstart',this.select.bind(this));
  }

  select(){
    G.board.animateBoardTo(this.x * this.tSize);
    console.log(`${this.x} - ${this.y}`)
  }

  render(tSize){
    // this.el.innerHTML =  `<rect x=${this.x * tSize} y=${this.y * tSize} width=${tSize} height=${tSize} fill=${this.selected ? 'lightgreen' : 'gray'} stroke='black' stroke-width='6'/>
    //                       <text x=${this.x * tSize + tSize/2} y=${this.y * tSize + tSize/2} fill="white" font-size="6vh" text-anchor="middle" alignment-baseline="central">
    //                         ${this.value}
    //                       </text>`;
    this.tSize = tSize;
    this.el.innerHTML =  `<circle cx=${this.x * tSize + tSize/2} cy=${this.y * tSize + tSize/2} r=${tSize/3} stroke="gray" stroke-width="1.5" fill="none" stroke-dasharray="4"/>
                          <text x=${this.x * tSize + tSize/2} y=${this.y * tSize + tSize/2} fill="black" font-size="6vh" text-anchor="middle" alignment-baseline="central">
                            ${this.value}
                          </text>`;
    return this.el;
  }

}