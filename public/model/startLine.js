class StartLine{
  constructor(players){
    this.el = createSVG('g');
    this.players = players;
  }

  render(tSize){
    let start = document.createDocumentFragment();
    for(let i=0; i<this.players.length; i++) start.appendChild(this.players[i].renderInStart(tSize));
    this.el.appendChild(start);

    //let start = '';
    // for(let i = 0; i<6; i++) start += `<rect x=${-1 * tSize + 5} y=${i * tSize + 5} width=${tSize - 10} height=${tSize - 10} fill='none' stroke='black' stroke-width='2'/>`;
    // for(let i = 0; i<2; i++) this.players[i]
    // this.el.innerHTML = start;
    return this.el;
  }
}