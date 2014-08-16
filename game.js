function Game(width_px, height_px, tilesize) {
  return {
    start: start,
  };

  function start() {
    this.map = Map(width_px / tilesize, height_px / tilesize, tilesize);
    this.player = Crafty.e('Player').at(1,1);
  }
}

window.addEventListener('load', function () {
  Crafty.init(400, 400);
  Crafty.background('black');
  game = Game(400, 400, 20);
  game.start();
});
