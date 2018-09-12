class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
    this.el = createSVG("text");
    this.el.addEventListener("click", this.event, false);
  }

  change(t){
    this.el.innerHTML = t;
  }

  render(px,py,anchor,font,editable){
    const fontStyle = font ? `fill:${font.color};font-size:${font.size}` : '';
    const style = (this.event ? 'cursor:pointer;' : '') + fontStyle;
    this.el.set([['x',px],['y',py],['text-anchor',anchor?anchor:'middle'],['style',style]]);
    this.el.innerHTML = this.text;
    return this.el;
  }
}
