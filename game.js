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

    var maxObj = Crafty('Destructable').length;
    var score = Crafty.e("2D, Canvas, Text").attr({
      x: 10,
      y: 10,
    }).textFont({weight: 'bold', size: '20px'})
      .textColor('#FFFFFF')
      .text("Score: 0")
      .bind('UpdateScore', function () {
        this.text("Score: " + (maxObj - Crafty('Destructable').length));
      });

    console.log("Game started.");
  }
}

return game;

}); // define
