class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
    this.el = createSVG("text");
    this.el.addEventListener("click", this.event, false);
  }

  render(px,py,anchor){
    this.el.set([['x',px],['y',py],['text-anchor',anchor?anchor:'middle'],['font-family','3vh'],['style',this.event ? 'cursor:pointer;' : '']]);
    this.el.innerHTML = this.text;
    return this.el;
  }
}
