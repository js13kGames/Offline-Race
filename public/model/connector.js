class Connector{

  constructor(you){
    this.el = createSVG('g');
    this.itsYou = you;
    this.el.set([['text-anchor','middle'],['alignment-baseline','central']]);
    this.dir = [{x:0,y:0,r:0},{x:1,y:0,r:0},{x:1,y:1,r:45,off:{x:0.166,y:-0.085}},{x:0,y:1,r:90,off:{x:0.333,y:0}},{x:-1,y:1,r:135,off:{x:0.4,y:0.166}},{x:-1,y:0,r:180,off:{x:0.333,y:0.333}},{x:-1,y:-1,r:225,off:{x:0.166,y:0.4}},{x:0,y:-1,r:270,off:{x:0,y:0.333}},{x:1,y:-1,r:315,off:{x:-0.085,y:0.166}}]
  }

  move(from,to,tS){
    const adjust = this.dir.find((p) => to.x-from.x == p.x && to.y-from.y == p.y)
    this.el.set([['transform',`translate(${to.x * tS + tS/3 + (adjust.off ? adjust.off.x * tS : 0)},${to.y * tS + tS/3 + (adjust.off ? adjust.off.y * tS : 0)}) scale(${tS/200}) rotate(${adjust.r})`]]);
  }

  render(p,tS){
    let strConn =
           `<path fill="black" d="M 2 58 L 3 9 C 13.5 9 18 3 24 3 L 55.5 3 L 55.5 15 L 45 15 L 45 27 L 16.5 27 L 16.5 39 L 45 39 L 45 51 L 55.5 51 L 55.5 63 L 24 63 C 18 63 13.5 57 1 57 " class="b"/>
            <path fill="${this.itsYou ? 'green' : 'red'}" d="M 55.5 3 L 55.5 15 L 45 15 L 45 27 L 16.5 27 L 16.5 39 L 45 39 L 45 51 L 55.5 51 L 55.5 63 L 80 63 L 80 3 Z" class="b"/>`;
    for(let i=0;i<5;i++) strConn += `<line x1="80" y1="${18 + i * 8}" x2="60" y2="${18 + i * 8}" class="b"/>`
    this.el.innerHTML = strConn;
    this.move(p,p,tS)
    return this.el;
  }
}


