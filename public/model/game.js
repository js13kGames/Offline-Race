class Game{
  constructor(socket){
    this.el = document.getElementById('game');
    this.body = document.body;
    this.state = 'intro';
    this.board = null;
    this.client = null;
    this.screenHeight = document.body.clientHeight;
    this.screenWidth = document.body.clientWidth;
    this.add(new Intro('connect').render());
    this.changeView(-40,-40,160,160);
  }

  add (el) { this.el.appendChild(el) }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  changeView (x,y,w,h) { this.el.setAttribute("viewBox", `${x} ${y} ${w} ${h}`) }

  resetView () { game.removeAttribute("viewBox") }

  adaptResolution (){
    if(G.screenHeight >= 450 && this.state == 'play') {
      G.el.setAttribute('style','height:450px;margin:"0 auto"');
      G.body.setAttribute('style','display:flex;align-items: center;"');
    }
    else{
      G.el.removeAttribute('style');
      G.body.removeAttribute('style');
    }
  }

  refresh () {
    const currentHeight = document.body.clientHeight;
    if(currentHeight > 450 && G.screenHeight > 450) return;
    else{
      G.screenHeight = currentHeight;
      G.screenWidth = document.body.clientWidth;
      this.adaptResolution();
      G.board.refresh();
    }
  }

  initGame(){
    this.client = new GameClient();
  }
}