class Menu{

  constructor(s,sInf){
    this.state = s;
    this.serverInfo = sInf;
    this.options = [
      {id:0,text:'Help'},
      {id:1,text:'Connect',f:function(){G.connect()}},
      {id:2,text:'About'}
    ]
    this.el = createSVG('g');
  }

  add(el){this.el.appendChild(el);}

  render(){
    G.changeView(0,0,200,200);
    this.el.innerHTML = '';
    this.add(new SVGText('Offline Race').render('50%','10%','middle'));
    this.options.forEach((o) => {
      this.add(this.drawOption(o));
    })
    this.add(new Plug(this.state == 'wait').render('30%','20%'));
    this.add(new SVGText('Offline Race').render('50%','10%','middle'));
    if(this.serverInfo) this.add(new SVGText(`Now: ${this.serverInfo.u} users connected, ${this.serverInfo.g} games`).render('50%','96%','middle',{size:'12px'}));
    return this.el;
  }

  drawOption(opt){
    let optEl = createSVG('g');
    optEl.set([['id',`op${opt.id}`]])
    optEl.appendChild(new SVGText(this.state == 'connect' ? opt.text : 'Wait',this.state == 'connect' ? 'G.initGame()' : null).render(`${25 + opt.id * 25}%`,'70%','middle'));
    return optEl;
  }



}