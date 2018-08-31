class ImpactMsg{
  constructor(id,text,anim){
    this.text = text;
    this.id = id;
    this.el = createSVG("text");
    this.el.set([['id',id]]);
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
    this.el.set([['x',`${pos.x}%`],['y',`${pos.y}%`],['font-weight','bold'],['font-family','arial'],['text-anchor',`${pos.anchor}`],['alignment-baseline','central'],['fill','white'],['stroke-width','1vh'],['stroke','black']]);
    if(this.anim)this.el.set([['style',`animation: ${this.id} ${this.anim.time} ${this.anim.persist ? 'forwards' : ''};`]]);
    this.el.innerHTML = this.text;
    return this.el;
  }
}