class SVGText{
  constructor(t,e){
    this.text = t;
    this.event = e;
  }

  render(px,py){
    return `<text x=${px} y=${py} font-family="3vh" onclick="${this.event}">${this.text}</text>`
  }
}
