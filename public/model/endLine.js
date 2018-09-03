class EndLine{

  constructor(c){
    this.el = createSVG('g');
    this.connected = c;
  }

  render(posX){
    let strEndLine =
      `
      <pattern id="pattern-checkers" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" >
        <rect style="fill:black;" x="0" width="100" height="100" y="0"/>
        <rect style="fill:black;" x="100" width="100" height="100" y="100"/>
      </pattern>

      <rect x="${0}" y="0" width="${G.screenWidth}" height="${G.screenHeight}" fill="url(#pattern-checkers)"/>`;
    this.el.innerHTML = strEndLine;
    return this.el;
  }
}