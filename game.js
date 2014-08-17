require.config({
  urlArgs: "bust=" + (new Date()).getTime()
});

define(['lib/crafty', 'map', 'player'], function(Crafty, Map, Player) {
console.log("Loading Game.");

Crafty.init(400, 400);
Crafty.background('black');
game = Game(400, 400, 20);
game.start();

function Game(width_px, height_px, tilesize) {
  return {
    start: start,
  };

  function start() {
    this.map = Map(width_px / tilesize, height_px / tilesize, tilesize);
    this.player = Crafty.e('Player').at(1,1);
    console.log(this.player);
    var collisions = this.player.hit('Block');
    if (collisions) {
      collisions.forEach(function (collision) {
        collision.obj.destroy();
      });
    }
    console.log("Game started.");
  }
}

return game;

}); // define
