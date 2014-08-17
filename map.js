define(['lib/crafty'], function (Crafty) {

Crafty.c('Edge', {
  init: function () {
    this.requires('Block');
    this.color('green');
  },
});

Crafty.c('Block', {
  _tilesize: 32,
  init: function () {
    this.requires('Solid, 2D, Canvas, Color');
    this.color('blue');
  },
  at: function (x, y, tilesize) {
    this.tilesize = tilesize || this._tilesize;
    this.attr({
      x: this.tilesize * x,
      y: this.tilesize * y,
      w: this.tilesize,
      h: this.tilesize,
    });
  },
  explode: function () {
    this.destroy();
  },
});

function Map(width_tiles, height_tiles, tilesize) {
  tilesize = tilesize || 32;

  //Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource( SOURCE_FROM_TILED_MAP_EDITOR );

  console.log("Building map " + width_tiles + "x" + height_tiles);

  for (var x = 0; x < width_tiles; x++) {
    for (var y = 0; y < height_tiles; y++) {

      var at_edge = x === 0 || y === 0 || x === width_tiles - 1 || y === height_tiles - 1;
      var should_be_block = at_edge || Math.random() < 0.1;

      if (at_edge) {
        Crafty.e('Edge').at(x,y, tilesize);
      } else if (should_be_block) {
        Crafty.e('Block').at(x,y, tilesize);
      }
    }
  }
}

return Map;


});
