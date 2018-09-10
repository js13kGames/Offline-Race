class EndLine{

  constructor(nR,fN){
    this.finalNumber = fN;
    this.nRows = nR;
    this.plug = new Plug("");
    this.el = createSVG('g');
    this.el.addEventListener(G.isTouchDevice ? 'touchstart' : 'click',this.select.bind(this));
  }

  select(){
    G.board.me.finish(this.nRows,this.finalNumber);
  }

  render(tS){
    this.posX = this.nRows * tS + 2*tS;
    this.posY = 3 * tS;

    let strEndLine =
      `<pattern id="pattern-checkers" x="0" y="0" width="${2*tS}" height="${2*tS}" patternUnits="userSpaceOnUse" >
        <rect x="0" width="${tS}" height="${tS}" y="0"/>
        <rect x="${tS}" width="${tS}" height="${tS}" y="${tS}"/>
      </pattern>
      <rect x="${this.nRows * tS}" y="0" width="${tS*4}" height="${tS*6}" fill="url(#pattern-checkers)" stroke="black" />`;
    this.el.innerHTML = strEndLine;
    this.el.appendChild(this.plug.render(this.posX,this.posY,tS));
    let number = createSVG('text');
    number.set([['x',this.posX+ tS/100],['y',this.posY+ tS/2],['fill','gray'],['font-size',G.maxH() ? '94px' : '21vh'],['text-anchor','middle'],['dominant-baseline','central'],['stroke','white'],['stroke-width',G.maxH() ? '4.6px' : '1vh']])
    number.innerHTML = this.finalNumber;
    this.el.appendChild(number);
    return this.el;
  }
}