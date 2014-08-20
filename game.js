require.config({
  urlArgs: "bust=" + (new Date()).getTime()
});

define(['lib/crafty', 'map', 'player'],
       function(Crafty, Map, Player, tiles) {
console.log("Loading Game.");

var game = {};
game.tile_size_pixels = 32;
game.view_width_tiles = 20;
game.view_height_tiles = 20;

game.view_width_pixels = function () {
  return this.tile_size_pixels * this.view_width_tiles;
};
game.view_height_pixels = function () {
  return this.tile_size_pixels * this.view_height_tiles;
};

Crafty.init(game.view_width_pixels(), game.view_height_pixels());
Crafty.background('black');
Crafty.viewport.init(game.view_width_pixels(), game.view_height_pixels());
Crafty.viewport.clampToEntities=false;

Crafty.scene("Level1", function () {
  require(['level1'], function (tiles) {
    game.map = Map(
      game.view_width_tiles,
      game.view_height_tiles,
      game.tile_size_pixels,
      tiles);

    var maxObj = Crafty('Destructable').length;
    game.score = Crafty.e("2D, Canvas, Text").attr({
      x: 10,
      y: 10,
    }).textFont({weight: 'bold', size: '20px'})
      .textColor('#FFFFFF')
      .text("Score: 0")
      .bind('UpdateScore', function () {
        this.text("Score: " + (maxObj - Crafty('Destructable').length));
      });

    Crafty.viewport.follow(Crafty('Player'), 0, 0);

    console.log("Level 1 started.");
  });
});

Crafty.scene("Level2", function () {
  require(['level2'], function (tiles) {
    game.map = Map(
      game.view_width_tiles,
      game.view_height_tiles,
      game.tile_size_pixels,
      tiles);

    var maxObj = Crafty('Destructable').length;
    game.score = Crafty.e("2D, Canvas, Text").attr({
      x: 10,
      y: 10,
    }).textFont({weight: 'bold', size: '20px'})
      .textColor('#FFFFFF')
      .text("Score: 0")
      .bind('UpdateScore', function () {
        this.text("Score: " + (maxObj - Crafty('Destructable').length));
      });

    Crafty.viewport.follow(Crafty('Player'), 0, 0);

    console.log("Level 2 started.");
  });
});

game.level1 = function () {
  Crafty.scene('Level1');
}

game.level2 = function () {
  Crafty.scene('Level2');
}

game.level1();

window.game = game;
return game;
}); // define
