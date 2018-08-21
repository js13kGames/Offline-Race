class Intro{

  constructor(s){
    this.el = document.createDocumentFragment();
    this.state = s;
  }

  render(){
    // this.el.innerHTML =
    //        `${new SVGText('Offline Race').render(-2,-10)}
    //         ${new Plug(this.state == 'wait').render()}
    //         ${new SVGText(this.state == 'connect' ? 'Play' : 'Wait',this.state == 'connect' ? 'G.initGame()' : null).render(25,105)}`;
    this.el.appendChild(new SVGText('Offline Race').render(-2,-10));
    this.el.appendChild(new Plug(this.state == 'wait').render());
    this.el.appendChild(new SVGText(this.state == 'connect' ? 'Play' : 'Wait',this.state == 'connect' ? 'G.initGame()' : null).render(25,105));
    return this.el;
  }

}


