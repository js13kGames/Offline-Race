class Player{
  constructor(id,you){
    this.id = id;
    this.itsYou = you;
    this.path = [];
    this.el = createSVG('g');
  }

  render(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
    return this.el;
  }

  renderInStart(tSize){
    const pos = (this.id == 1 ? 2 : 5) * tSize - tSize/2;
    this.el.innerHTML = `<circle id="p${this.id}" cx="${-tSize/2}" cy="${pos}" r="${tSize/2}" fill="${this.itsYou ? 'green' : 'red'}"/>`;
    return this.el;
  }
}