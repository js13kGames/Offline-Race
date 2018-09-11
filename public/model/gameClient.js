class GameClient {
  constructor(){
    this.socket = io();
    this.initializeEvents(this.socket);
  }

  initializeEvents(socket){
    socket.on("connect", () => {
      G.state = 'wait';
      G.clear();
      G.add(new Intro('wait').render());
    });

    socket.on("disconnect", () => {
      if(G.state != 'finished'){
        G.showMsg('disc','Sorry your rival has disconnected','red');
        setTimeout(() => {
          G.state = 'wait';
          G.clear();
          G.add(new Intro('connect').render());
        },3000);
      }
      else G.showMsg('end','Game finished click anywhere to exit','red');
      
    });

    socket.on("wait", () => {
      document.body.onresize = null;
      G.state = 'wait';
      G.clear();
      G.add(new Intro('wait').render());
    });

    socket.on("play", (data) => {
      G.state = 'play';
      G.clear();
      G.board = new Board(data.board,data.player);
      G.fixContent = new FixContent();
      G.add(G.board.render());
      G.add(G.fixContent.render());
      G.resetView();
      document.body.onresize = () => G.refresh();
      const checkReady = function () {
        if(document.getElementById('fix')) socket.emit('ready');
        else setTimeout(checkReady,200);
      }
      checkReady();
    });

    socket.on("start", (number) => {
      G.showNextNumber(number.n);
    });

    socket.on("next", (number,idPlayer,path) => {
      G.fixContent.remove(document.getElementById('numToGet'));
      G.board.players.forEach((p) => p.numberGetted(idPlayer,path));
      G.showNextNumber(number.n);
    });

    socket.on("timeout", (number) => {
      G.fixContent.remove(document.getElementById('numToGet'));
      G.showMsg('tout','TIMEOUT','red');
      G.showNextNumber(number.n);
    });

    socket.on("finish", (idPlayer,path) => {
      let me = G.board.players.find((p)=> p.itsYou);
      G.board.players.forEach((p) => {
        p.numberGetted(idPlayer,path);
        p.finishMove(idPlayer,path);
      });
      G.endGame(me.id == idPlayer);
      G.state = 'finished';
    });
  }
}