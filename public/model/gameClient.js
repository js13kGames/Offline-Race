class GameClient {
  constructor(){
    // Connecting to sockets server
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
      G.state = 'intro';
      console.log('DISCONNECT');
    });

    socket.on("wait", () => {
      document.body.onresize = null;
      G.state = 'wait';
      G.clear();
      G.changeView(-40,-40,160,160);
      G.add(new Intro('wait').render());
    });

    socket.on("play", (data) => {
      G.state = 'play';
      G.clear();
      G.board = new Board(data.board,data.player);
      G.fixContent = new FixContent();
      //G.fixContent.add(new ImpactMsg('17').render(20,20));
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
      G.numberToGet = number.n;
      G.fixContent.add(new ImpactMsg(number.n,'numToGet').render());
    });

    socket.on("next", (number) => {
      G.fixContent.remove(document.getElementById('numToGet'));
      G.numberToGet = number.n;
      G.fixContent.add(new ImpactMsg(number.n,'numToGet').render());
    });
  }
}