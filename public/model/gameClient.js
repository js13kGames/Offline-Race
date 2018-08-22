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
      G.add(G.board.render());
      document.body.onresize = () => G.refresh();
    });
  }
}