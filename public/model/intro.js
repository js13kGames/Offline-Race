class Intro{

  constructor(s){
    this.el = createSVG('g');
    this.options = createSVG('g');
    this.state = s;
    this.anim = [{p: 0,style:'font-size:0vh'},{p:60,s:'font-size:8vh'},{p:100,s:'font-size:0vh'}];
  }

  add(el){this.el.appendChild(el);}
  addOpt(el){this.options.appendChild(el);}
  remOpt(el){this.options.innerHTML = '';}

  second(){
    this.add(new ImpactMsg('m2','ARE',{time:'0.5s',persist:false,keyf:this.anim},this.third.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
  }

  third(){
    let title = new ImpactMsg('m3','OFFLINE',{time:'0.5s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]});
    this.add(title.render({x:'50%',y:'46%',anchor:'middle'}));
    setTimeout(() => {
      title.addAnimation('goup',{time:'0.5s',persist:true,keyf:[{p:0,s:'font-size:8vh'},{p:100,s:'transform: translate(0%, -4%);fill:red;'}]})
      this.add(new ImpactMsg('m4','RACE',{time:'0.5s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]},this.menu.bind(this)).render({x:'50%',y:'54%',anchor:'middle'}));
    },500);
  }

  submenu(){
    this.remOpt();
    this.addOpt(new SVGText(this.state == 'connect' ? 'Rand' : 'Wait',this.state == 'connect' ? G.initGame : null).render(15,105,'end'));
    this.addOpt(new SVGText(this.state == 'connect' ? 'With' : 'Wait',this.state == 'connect' ?  () => alert('Random') : null).render(40,105,'middle'));
    this.addOpt(new SVGText(this.state == 'connect' ? 'Back' : 'Wait',this.state == 'connect' ?  this.menu.bind(this) : null).render(65,105,'start'));
  }

  menu(){
    G.changeView(-40,-40,160,160);
    this.el.innerHTML = '';
    this.remOpt();
    this.add(new SVGText('Offline Race').render(40,-10,'middle'));
    this.add(new Plug(this.state == 'wait').render());
    this.addOpt(new SVGText(this.state == 'connect' ? 'Play' : 'Waiting for rival',this.state == 'connect' ? this.submenu.bind(this) : null).render(40,105,'middle'));
    this.add(this.options);
  }

  render(){
    if(this.state != 'wait') this.add(new ImpactMsg('m1','YOU',{time:'2s',persist:false,keyf:this.anim},this.second.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
    else this.menu();
    return this.el;
  }
}