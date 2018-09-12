class Plug{

  constructor(c){
    this.el = createSVG('g');
    this.connected = c;
  }

  set(on){
    this.connected = on;
    this.el.children[0].set([['fill',on ? 'lightgreen' : 'gray']]);
  }

  render(pX,pY,tS){
    let str =
      `<rect x="2" y="2" rx="8" ry="8" width="80" height="80" fill="${this.connected ? 'lightgreen' : 'gray'}" class="b"/>
      <path d="M 12 12 l 60 0 l 0 40 l -10 0 l 0 10 l -10 0 l 0 10 l -20 0 l 0 -10 l -10 0 l 0 -10 l -10 0 Z" class="b" fill="black"/>`;
    for(let i=0;i<5;i++) str += `<line x1="${22 + i * 10}" y1="15" x2="${22 + i * 10}" y2="40" class="w"/>`
    this.el.innerHTML = str;
    const scale = tS/30;
    const offSet = scale * 40;
    if(pX && pY) this.el.set([['transform',`translate(${pX-offSet},${pY-offSet}) scale(${scale})`]])
    return this.el;
  }
}