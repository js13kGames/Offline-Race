class ImpactMsg{
  constructor(t,id){
    this.text = t;
    this.el = createSVG("text");
    if(id) this.el.setAttribute('id',id);
    addStyle("@keyframes effect {0% {font-size: 0vh;fill:'white'} 50% {font-size: 25vh;transform: translate(0%, 0%);fill:red;text-anchor:middle; } 100%{text-anchor:end; font-size: 8vh;stroke-width: 0.3vh;transform: translate(45%, -40%); fill:yellow; }}");
  }

  render(){
    this.el.setAttribute('x','50%');
    this.el.setAttribute('y','50%');
    this.el.setAttribute('font-weight','25vh');
    this.el.setAttribute('font-weight','bold');
    this.el.setAttribute('font-family','arial');
    this.el.setAttribute('text-anchor','middle');
    this.el.setAttribute('alignment-baseline','central');
    this.el.setAttribute('fill','white');
    this.el.setAttribute('stroke-width','1vh');
    this.el.setAttribute('stroke','black');
    this.el.setAttribute('style','animation: effect 4s forwards;');

    this.el.innerHTML = this.text;
    return this.el;
  }
}