class Plug{

  constructor(c){
    this.connected = c;
    this.el = createSVG('g');

  }

  render(pX,pY){

    let strPlug =
      `<rect x="2" y="2" rx="8" ry="8" width="80" height="80" fill="${this.connected ? 'lightgreen' : 'none'}" class="b"/>
      <path d="M 12 12 l 60 0 l 0 40 l -10 0 l 0 10 l -10 0 l 0 10 l -20 0 l 0 -10 l -10 0 l 0 -10 l -10 0 Z" class="b" fill="black"/>`;
    for(let i=0;i<5;i++) strPlug += `<line x1="${22 + i * 10}" y1="15" x2="${22 + i * 10}" y2="40" class="w"/>`
    this.el.innerHTML = strPlug;
    this.el.set([['style',`transform-origin:center;transform:translate(${pX},${pY});`]]);
    return this.el;
  }
}