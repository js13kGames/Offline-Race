class Intro{

  constructor(s){
    this.el = createSVG('g');
    this.state = s;
    this.anim = [{percentage: 0,style:'font-size:0vh'},{percentage:60,style:'font-size:6vh'},{percentage:100,style:'font-size:0vh'}];
  }

  add(el){this.el.appendChild(el);}

  second(){
    this.add(new ImpactMsg('m2','ARE',{time:'2s',persist:false,keyf:this.anim},this.third.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
  }

  third(){
    this.add(new ImpactMsg('m3','OFFLINE',{time:'2s',persist:false,keyf:this.anim},this.menu.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
  }

  menu(){
    G.changeView(-40,-40,160,160);
    this.add(new SVGText('Offline Race').render(-2,-10));
    this.add(new Plug(this.state == 'wait').render());
    this.add(new SVGText(this.state == 'connect' ? 'Play' : 'Wait',this.state == 'connect' ? 'G.initGame()' : null).render(25,105));
  }

  render(){
    if(this.state != 'wait') this.add(new ImpactMsg('m1','YOU',{time:'2s',persist:false,keyf:this.anim},this.second.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
    else this.menu();
    return this.el;
  }
}


S