class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
    this.el = createSVG("text");
  }

  render(px,py){
    this.el.set([['x',px],['y',py],['font-family','3vh'],['onclick',this.event],['style',this.event ? 'cursor:pointer;' : '']]);
    this.el.innerHTML = this.text;
    return this.el;
  }
}
