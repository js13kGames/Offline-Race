class FixContent{

  constructor(x,y,v){
    this.el = createSVG('svg');
    this.el.setAttribute('id','fix');
  }

  add(el) {this.el.appendChild(el);}

  render(){
    return this.el;
  }

}