class Marker{

  constructor(n,tS){
    this.number = n; 
    this.alpha = 0;
    this.scale = 22 + tS/30;
    this.scalebg = 24 + tS/30;
    this.counter = createSVG('path');
    this.bg = createSVG('circle');
    this.numberEl = createSVG('text');
    this.el = createSVG('svg');
  }

   animate() {
    this.alpha ++;
    this.alpha  %= 360; 
    var r = ( this.alpha * Math.PI / 180 )
      , x = Math.sin( r ) * this.scale
      , y = Math.cos( r ) * -this.scale
      , mid = ( this.alpha  >= 180 ) ? 1 : 0
      , anim = `M 0 0 v ${-this.scale} A ${this.scale} ${this.scale} 1 ` 
             + mid + ' 1 ' 
             +  x  + ' ' 
             +  y  + ' z';
    if (this.alpha < 360) setTimeout(this.animate.bind(this), (1000 / 360) * 30); // Redraw
    else anim = `M 0 0 v ${-this.scale} A ${this.scale} ${this.scale} 1 1 1 -.1 ${-this.scale} z`;
    this.counter.set([['d',anim]]);
  }

  render(){
    this.bg.set([['cx','0'],['cy','0'],['r',this.scalebg],['fill','orange']])
    this.numberEl.set([['x',0],['y',0],['font-size','33px'],['font-weight','bold'],['font-family','arial'],['text-anchor',`middle`],['dominant-baseline','central'],['fill','white'],['stroke-width','2px'],['stroke','black']])
    this.numberEl.innerHTML = this.number;
    
    this.el.appendChild(this.bg)
    this.el.appendChild(this.counter);
    this.el.appendChild(this.numberEl);

    this.el.set([['x','91.5%'],['y','4%'],['height',this.scalebg*2],['width',this.scalebg*2],['viewBox',`${-this.scalebg} ${-this.scalebg} ${this.scalebg*2} ${this.scalebg*2}`],]);
    this.animate();
    return this.el;
  }
}