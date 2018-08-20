class Intro{

  constructor(s){
    this.state = s;
    UI.changeView(-40,-40,160,160);
  }

  render(){
    return `${new SVGText('Offline Race').render(-2,-10)}
            ${new Plug(this.state == 'wait').render()}
            ${new SVGText(this.state == 'connect' ? 'Play' : 'Wait',this.state == 'connect' ? 'G.initGame()' : null).render(25,105)}`
  }

}


