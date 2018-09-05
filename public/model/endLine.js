class EndLine{

  constructor(nR,fN){
    this.finalNumber = fN;
    this.nRows = nR;
    this.el = createSVG('g');
    this.el.addEventListener(G.isTouchDevice ? 'touchstart' : 'click',this.select.bind(this));
  }

  select(){
    G.board.me.finish(this.nRows,this.finalNumber);
  }

  render(tS){
    let strEndLine =
      `<pattern id="pattern-checkers" x="0" y="0" width="${2*tS}" height="${2*tS}" patternUnits="userSpaceOnUse" >
        <rect x="0" width="${tS}" height="${tS}" y="0"/>
        <rect x="${tS}" width="${tS}" height="${tS}" y="${tS}"/>
      </pattern>
      <rect x="${this.nRows * tS}" y="0" width="${tS*4}" height="${tS*6}" fill="url(#pattern-checkers)" stroke="black" />
      <text x=${this.nRows * tS + 2*tS} y=${3 * tS} fill="white" font-size=${G.maxH() ? '96px' : '22vh'} text-anchor="middle" dominant-baseline="central" stroke="black" stroke-width=${G.maxH() ? '4.5px' : '1vh'}>
        ${this.finalNumber}
      </text>`;
    this.el.innerHTML = strEndLine;
    return this.el;
  }
}