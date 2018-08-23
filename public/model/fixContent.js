class FixContent{

  constructor(x,y,v){
    this.el = createSVG('svg');
  }

  add(el) {this.el.appendChild(el);}

  render(){
    this.el.innerHTML = `<text x="98%" y="6%" fill="black" font-size="6vh" text-anchor="end">
                          52
                        </text>`;
    return this.el;
  }

}