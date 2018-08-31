class FixContent{

  constructor(x,y,v){
    this.el = createSVG('svg');
    this.el.set([['id','fix']]);
  }

  add(el) {this.el.appendChild(el);}

  remove(el) {this.el.removeChild(el)}

  render(){
    return this.el;
  }

}