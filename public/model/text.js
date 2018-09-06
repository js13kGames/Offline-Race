class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
    this.el = createSVG("text");
  }

  render(px,py,anchor,font){
    this.el.set([['x',px],['y',py],['font-size',font ? font.size : ''],['onclick',this.event],['style',this.event ? 'cursor:pointer;' : ''],['text-anchor',`${anchor}`],['dominant-baseline','central']]);
    this.el.innerHTML = this.text;
    return this.el;
  }
}
