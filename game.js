require.config({
  urlArgs: "bust=" + (new Date()).getTime()
});

define(['lib/crafty', 'map', 'player'],
       function(Crafty, Map, Player, tiles) {
console.log("Loading Game.");

Crafty.c('Score', {
  _prefix: "Remaining: ",
  init: function () {
    this.requires('2D, Canvas, Text').attr({
      x: 10,
      y: 10,
    }).textFont({weight: 'bold', size: '20px'})
      .textColor('#FFFFFF')
      .text(this._prefix)
      .bind('UpdateScore', function () {
        var remaining = Crafty('Destructable').length;
        if (remaining == 0) {
          Crafty.scene(this.next_scene);
        } else {
          this.text(this._prefix + Crafty('Destructable').length);
        }
      })
      .bind('ViewportScroll', function (e) {
        this.x = Math.max(0, 10 - Crafty.viewport.x);
        this.y = Math.max(0, 10 - Crafty.viewport.y);
      });
  },
});

Crafty.scene("Level1", function () {
  require(['level1'], function (tiles) {
    game.map = Map(
      game.view_width_tiles,
      game.view_height_tiles,
      game.tile_size_pixels,
      tiles);

    game.score = Crafty.e("Score");
    game.score.next_scene = 'Level2';

    Crafty.viewport.follow(Crafty('Player'), 0, 0);

    Crafty.trigger('UpdateScore');

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

    game.score = Crafty.e("Score");
    game.score.next_scene = 'Level1';

    Crafty.viewport.follow(Crafty('Player'), 0, 0);

    Crafty.trigger('UpdateScore');

    console.log("Level 2 started.");
  });
});

var game = {};
game.tile_size_pixels = 32;
game.view_width_tiles = 16;
game.view_height_tiles = 16;

game.view_width_pixels = function () {
  return this.tile_size_pixels * this.view_width_tiles;
};
game.view_height_pixels = function () {
  return this.tile_size_pixels * this.view_height_tiles;
};

Crafty.init(game.view_width_pixels(), game.view_height_pixels());
Crafty.background('black');
Crafty.viewport.init(game.view_width_pixels(), game.view_height_pixels());
Crafty.viewport.clampToEntities = true;

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
