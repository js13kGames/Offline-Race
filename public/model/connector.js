class Connector{

  constructor(tS,you){
    this.el = createSVG('g');
    this.tSize = tS;
    this.itsYou = you;
    this.el.setAttribute('text-anchor','middle');
    this.el.setAttribute('alignment-baseline','central');
  }

  position(p){
    this.el.setAttribute('transform',`translate(${p.x * this.tSize/2},${(p.y * this.tSize + this.tSize/3)}) scale(${this.tSize/200})`);
  }

  render(p){
    this.el.innerHTML =
           `<path fill="black" d="M 2 58 L 3 9 C 13.5 9 18 3 24 3 L 55.5 3 L 55.5 15 L 45 15 L 45 27 L 16.5 27 L 16.5 39 L 45 39 L 45 51 L 55.5 51 L 55.5 63 L 24 63 C 18 63 13.5 57 1 57 " class="b"/>
            <path fill="${this.itsYou ? 'green' : 'red'}" d="M 55.5 3 L 55.5 15 L 45 15 L 45 27 L 16.5 27 L 16.5 39 L 45 39 L 45 51 L 55.5 51 L 55.5 63 L 80 63 L 80 3 Z" class="b"/>
            <line x1="80" y1="18" x2="60" y2="18" class="b" />
            <line x1="80" y1="26" x2="60" y2="26" class="b" />
            <line x1="80" y1="34" x2="60" y2="34" class="b" />
            <line x1="80" y1="42" x2="60" y2="42" class="b" />
            <line x1="80" y1="50" x2="60" y2="50" class="b" />`;
    this.position(p);
    return this.el;
  }

}

