class FixContent{

  constructor(x,y,v){
    this.el = createSVG('svg');
  }

  add(el) {this.el.appendChild(el);}

  render(){
    return this.el;
  }

}