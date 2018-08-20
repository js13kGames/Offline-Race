class Intro{

  constructor(){
    UI.changeView(-40,-40,160,160);
    this.click = function(){alert('jau')}
  }

  render(){
    return `${new SVGText('Offline Race').render(-2,-10)}
            ${new Plug().render()}
            ${new SVGText('Play','G.initGame()').render(25,105)}`
  }

}


