
let msg = document.getElementById('msg');
let board = document.getElementById('board');
const addToBoard = el => (board.innerHTML += el);

const TILE_SIZE = document.body.clientHeight / 6;

const UI = {
  setMessage: (m) => msg.innerHTML =  m,
  drawBoard: (tiles) => {
    const HALF_TILE = TILE_SIZE / 2;
    let strTiles = '';
    tiles.forEach(function(t) {
      const pos = t.split;
      strTiles +=
        `<g>
          <rect x=${t.i * TILE_SIZE} y=${t.j * TILE_SIZE} width=${TILE_SIZE} height=${TILE_SIZE} fill='gray' stroke='white' stroke-width='2'/>
          <text x=${t.i * TILE_SIZE + HALF_TILE} y=${t.j * TILE_SIZE + HALF_TILE} fill="white" font-size="4vh" text-anchor="middle" alignment-baseline="central">
            ${t.v}
          </text>
        </g>`
    });
    addToBoard(strTiles);
  },
  clearBoard: () => board.innerHTML = ''
}



