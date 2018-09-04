class Intro{

  constructor(s){
    this.el = createSVG('g');
    this.state = s;
    this.anim = [{p: 0,style:'font-size:0vh'},{p:60,s:'font-size:8vh'},{p:100,s:'font-size:0vh'}];
  }

  add(el){this.el.appendChild(el);}

  second(){
    this.add(new ImpactMsg('m2','ARE',{time:'2s',persist:false,keyf:this.anim},this.third.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
  }

  third(){
    let title = new ImpactMsg('m3','OFFLINE',{time:'2s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]});
    this.add(title.render({x:'50%',y:'46%',anchor:'middle'}));
    setTimeout(() => {
      title.addAnimation('goup',{time:'4s',persist:true,keyf:[{p:0,s:'font-size:8vh'},{p:100,s:'transform: translate(0%, -4%);fill:red;'}]})
      this.add(new ImpactMsg('m4','RACE',{time:'2s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]},this.menu.bind(this)).render({x:'50%',y:'54%',anchor:'middle'}));
    },2000);
  }

  menu(){
    G.changeView(-40,-40,160,160);
    this.el.innerHTML = '';
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