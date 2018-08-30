class ImpactMsg{
  constructor(id,text,anim){
    this.text = text;
    this.id = id;
    this.el = createSVG("text");
    this.el.setAttribute('id',id);
    if(anim) {this.setAnimation(anim)};
  }

  remove(el){
    G.fixContent.el.removeChild(el);
  }

  setAnimation(anim){
    if(!anim.persist)this.el.addEventListener("animationend",() => this.remove(this.el));
    this.anim = anim;
    const keyf = () => {
      let strKeys = '';
      for(let i=0;i<anim.keyf.length;i++) strKeys += `${anim.keyf[i].percentage}% {${anim.keyf[i].style}} `;
      return strKeys;
    }
    addStyle(`@keyframes ${this.id} {${keyf()}}`);
  }

  render(pos){
    this.el.setAttribute('x',`${pos.x}%` );
    this.el.setAttribute('y',`${pos.y}%`);
    this.el.setAttribute('font-weight','bold');
    this.el.setAttribute('font-family','arial');
    this.el.setAttribute('text-anchor',`${pos.anchor}`);
    this.el.setAttribute('alignment-baseline','central');
    this.el.setAttribute('fill','white');
    this.el.setAttribute('stroke-width','1vh');
    this.el.setAttribute('stroke','black');
    if(this.anim)this.el.setAttribute('style',`animation: ${this.id} ${this.anim.time} ${this.anim.persist ? 'forwards' : ''};`);
    this.el.innerHTML = this.text;
    return this.el;
  }
}