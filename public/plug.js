
class Plug{

  constructor(c){
    this.el = createSVG('g');
    this.connected = c;
  }

  render(){
    this.el.innerHTML =
           `<rect x="2" y="2" rx="8" ry="8" width="80" height="80" fill="${this.connected ? 'lightgreen' : 'none'}" class="b"/>
            <path d="M 12 12 l 60 0 l 0 40 l -10 0 l 0 10 l -10 0 l 0 10 l -20 0 l 0 -10 l -10 0 l 0 -10 l -10 0 Z" class="b" fill="black"/>
            <line x1="22" y1="15" x2="22" y2="40" class="w"/>
            <line x1="32" y1="15" x2="32" y2="40" class="w"/>
            <line x1="42" y1="15" x2="42" y2="40" class="w"/>
            <line x1="52" y1="15" x2="52" y2="40" class="w"/>
            <line x1="62" y1="15" x2="62" y2="40" class="w"/>`;
    return this.el;
  }
}