class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
    this.el = createSVG("text");
  }

  render(px,py){
    this.el.setAttribute('x',px);
    this.el.setAttribute('y',py);
    this.el.setAttribute('font-family','3vh');
    this.el.setAttribute('onclick',this.event);
    this.el.setAttribute('style',this.event ? 'cursor:pointer;' : '')
    this.el.innerHTML = this.text;
    return this.el;
  }
}
