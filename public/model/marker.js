class Marker{

  constructor(){
    this.alpha = 0;
    this.timer = (1000 / 360) * 10;
    this.el = createSVG('path');
  }

  startCounter(){
    this.tick();
  }

  draw(){
    var r = ( this.alpha * Math.PI / 180 )
    , x = Math.sin( this.alpha ) * 125
    , y = Math.cos( this.alpha ) * - 125
    , mid = ( this.alpha >= 180 ) ? 1 : 0
    , anim = 'M 0 0 v -125 A 125 125 1 '
           + mid + ' 1 '
           +  x  + ' '
           +  y  + ' z';
    this.el.set([['d',anim]])
  }

  tick() {
    this.alpha++;
    //this.alpha %= 360; //infinite loading

    self = this;
    if (this.alpha < 360){
      setTimeout(function() {
        requestAnimationFrame(() => self.tick());
      }, 1000);
      self.draw();
    }
  }

  render(){
    this.el.set([['transform',"translate(125, 125) scale(.98)"]]);
    this.startCounter();
    return this.el;
  }
}