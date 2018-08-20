let game = document.getElementById('game');

const UI = {
  changeView: (x,y,w,h) => game.setAttribute("viewBox", `${x} ${y} ${w} ${h}`),
  resetView: () => game.removeAttribute("viewBox"),
  changeScene: el => (game.innerHTML = el)
}