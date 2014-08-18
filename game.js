require.config({
  urlArgs: "bust=" + (new Date()).getTime()
});

define(['lib/crafty', 'map', 'player', 'tiles'],
       function(Crafty, Map, Player, tiles) {
console.log("Loading Game.");

var size = 32 * 20;

Crafty.init(size, size);
Crafty.background('black');
var game = Game(size, size, 20);
game.start();

function Game(width_px, height_px, tilesize) {
  return {
    start: start,
  };

  function start() {
    //var tiles = JSON.parse(tileJson);
    this.map = Map(width_px / tilesize, height_px / tilesize, tilesize, tiles);
    this.player = Crafty.e('Player').at(3,3);
    var collisions = this.player.hit('Block');
    if (collisions) {
      collisions.forEach(function (collision) {
        collision.obj.destroy();
      });
    }
    console.log("Game started.");

    console.log(Crafty('Player'));
    console.log(Crafty(Crafty('Block')[0]));
  }
}

return game;

}); // define
