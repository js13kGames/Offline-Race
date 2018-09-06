class Intro{

  constructor(s,serverInfo){
    this.el = createSVG('g');
    this.state = s;
    this.anim = [{p: 0,style:'font-size:0vh'},{p:60,s:'font-size:8vh'},{p:100,s:'font-size:0vh'}];
    this.menu = new Menu(s,serverInfo);
    this.showMenu = this.showMenu.bind(this);
    this.menu.render = this.menu.render.bind(this.menu);
  }

  add(el){this.el.appendChild(el);}

  second(){
    this.add(new ImpactMsg('m2','ARE',{time:'0.5s',persist:false,keyf:this.anim},this.third.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
  }

  third(){
    let title = new ImpactMsg('m3','OFFLINE',{time:'0.5s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]});
    this.add(title.render({x:'50%',y:'46%',anchor:'middle'}));
    setTimeout(() => {
      title.addAnimation('goup',{time:'0.5s',persist:true,keyf:[{p:0,s:'font-size:8vh'},{p:100,s:'transform: translate(0%, -4%);fill:red;'}]})
      this.add(new ImpactMsg('m4','RACE',{time:'0.5s',persist:true,keyf:[{p: 0,s:'font-size:0vh'},{p:100,s:'font-size:8vh'}]},this.showMenu).render({x:'50%',y:'54%',anchor:'middle'}));
    },500);
  }

  showMenu(){
    G.changeView(0,0,200,200);
    this.el.innerHTML = '';
    this.add(this.menu.render());
  }

  render(){
    if(this.state == 'intro') this.add(new ImpactMsg('m1','YOU',{time:'2s',persist:false,keyf:this.anim},this.second.bind(this)).render({x:'50%',y:'50%',anchor:'middle'}));
    else setTimeout(this.showMenu,200);
    return this.el;
  }
}