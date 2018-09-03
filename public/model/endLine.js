class EndLine{

  constructor(c){
    this.el = createSVG('g');
    this.connected = c;
  }

  render(posX,tS){
    let strEndLine =
      `<pattern id="pattern-checkers" x="0" y="0" width="${2*tS}" height="${2*tS}" patternUnits="userSpaceOnUse" >
        <rect class="checker" x="0" width="${tS}" height="${tS}" y="0"/>
        <rect class="checker" x="${tS}" width="${tS}" height="${tS}" y="${tS}"/>
      </pattern>
      <rect x="${posX}" y="0" width="${tS*4}" height="${tS*6}" fill="url(#pattern-checkers)" stroke="black" />
      <text x=${posX + tS * 2} y=${3 * tS} fill="yellow" font-size="22vh" text-anchor="middle" alignment-baseline="central" stroke="gray" stroke-width="1vh">
        ${4}
      </text>`;
    this.el.innerHTML = strEndLine;
    return this.el;
  }
}