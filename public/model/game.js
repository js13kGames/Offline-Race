class Game{
  constructor(){
    this.el = document.getElementById('game');
    this.body = document.body;
    this.state = 'intro';
    this.board = null;
    this.fixContent = null;
    this.client = null;
    this.screenHeight = document.body.clientHeight;
    this.screenWidth = document.body.clientWidth;
    this.numberToGet = null;
    this.isTouchDevice = ("ontouchstart" in document.documentElement);
    this.add(new Intro('connect').render());
    this.changeView(-40,-40,160,160);
  }

  add (el) { this.el.appendChild(el) }

  clear () { while (this.el.firstChild) this.el.removeChild(this.el.firstChild); }

  changeView (x,y,w,h) { this.el.set([["viewBox", `${x} ${y} ${w} ${h}`]]) }

  resetView () { game.removeAttribute("viewBox") }

  adaptResolution (){
    if(G.screenHeight >= 450 && this.state == 'play') {
      G.el.set([['style','height:450px;margin:"0 auto"']]);
      G.body.set([['style','display:flex;align-items: center;"']]);
    }
    else{
      G.el.removeAttribute('style');
      G.body.removeAttribute('style');
    }
  }

  refresh () {
    const currentHeight = document.body.clientHeight;
    G.screenHeight = currentHeight;
    G.screenWidth = document.body.clientWidth;
    this.adaptResolution();
    G.board.refresh();
  }

  showNextNumber (n) {
    this.numberToGet = n;
    const anim = {
      time:'4s',persist:true,
      keyf:[
        {percentage: 0,style: `font-size: 0vh;fill:'white'`},
        {percentage: 50,style: `font-size: 25vh;transform: translate(0%, 0%);fill:red;text-anchor:middle;`},
        {percentage: 100,style: `text-anchor:end; font-size: 8vh;stroke-width: 0.3vh;transform: translate(45%, -40%); fill:yellow;`}
      ]
    }
    this.fixContent.add(new ImpactMsg('numToGet',n,anim).render({x:50,y:50,anchor:'middle'}));
  }

  showMsg (id,m,color) {
    this.fixContent.add(new ImpactMsg(id,m,{time:'2s',persist:false,keyf:
    [
      {percentage: 0,style: `font-size: 0vh;fill:'white';stroke-width:0.25vh;`},
      {percentage: 70,style: `font-size: 10vh;stroke-width:0.25vh;`},
      {percentage: 100,style: `font-size: 10vh;fill:${color};stroke-width:0.25vh;`}
    ]}).render({x:90,y:5,anchor:'end'}));
  }

  initGame(){
    this.client = new GameClient();
  }
}