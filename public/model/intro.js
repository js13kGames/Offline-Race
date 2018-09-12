class Intro{

  constructor(s){
    this.el = createSVG('g');
    this.options = createSVG('g');
    this.state = s;
    this.plug = new Plug(false); 
    this.serverInfo = new SVGText('');
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

  playwithmenu(){
    this.remOpt();
    this.addOpt(new SVGText('Create',G.play.bind(G,'create')).render(15,105,'end'));
    this.addOpt(new SVGText('Join', G.play.bind(G,'join')).render(40,105,'middle'));
    this.addOpt(new SVGText('Back',this.submenu.bind(this)).render(65,105,'start',{color:'red'}));
  }

  sharemenu(code){
    this.remOpt();
    this.addOpt(new SVGText(code).render(40,105,'middle',{size:'3vh'}));
    this.addOpt(new SVGText('Back',this.playwithmenu.bind(this)).render(70,105,'start',{color:'red'}));
  }

  submenu(){
    if(G.client == null) G.initClient();
    this.plug.set(true);
    this.remOpt();
    this.addOpt(new SVGText('Rand',G.play.bind(G,'rand')).render(15,105,'end'));
    this.addOpt(new SVGText('With',this.playwithmenu.bind(this)).render(40,105,'middle'));
    this.addOpt(new SVGText('Exit',this.menu.bind(this)).render(65,105,'start',{color:'red'}));
  }

  wait(){
    this.el.innerHTML = '';
    this.remOpt();
    this.add(new SVGText('Offline Race').render(40,-15,'middle',{size:'1.2em'}));
    this.plug.set(true);
    this.add(this.plug.render());
    this.addOpt(new SVGText('Waiting for rival',this.submenu.bind(this)).render(40,105,'middle',{size:'1.5vh'}));
    this.add(this.serverInfo.render(40,-5,'middle',{size:'0.5em',color:'gray'}));
    this.addOpt(new SVGText('Exit',this.menu.bind(this)).render(65,105,'start',{color:'red'}));
    this.add(this.options);
  }

  menu(){
    if(G.client != null) G.disconnectClient();
    G.changeView(-40,-40,160,160);
    this.el.innerHTML = '';
    this.remOpt();
    this.add(new SVGText('Offline Race').render(40,-15,'middle',{size:'1.2em'}));
    this.add(this.plug.render());
    this.plug.set(false);
    this.addOpt(new SVGText('Play',this.submenu.bind(this)).render(40,105,'middle'));
    this.add(this.serverInfo.render(40,-5,'middle',{size:'0.5em',color:'gray'}));
    this.add(this.options);
  }

  render(){
    if(this.state != 'wait') this.add(new ImpactMsg('m1','YOU',{time:'2s',persist:false,keyf:this.anim},this.second.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
    else this.menu();
    return this.el;
  }
}