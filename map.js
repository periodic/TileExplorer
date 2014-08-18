define(['lib/crafty', 'lib/Tiled/tiledmapbuilder'], function (Crafty) {

Crafty.c('Edge', {
  init: function () {
    this.requires('Block');
  },
});

Crafty.c('Block', {
  _tilesize: 32,
  init: function () {
    this.requires('Solid');
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

function Map(width_tiles, height_tiles, tilesize, tilesData) {
  tilesize = tilesize || 32;

  var mapBuilder = Crafty.e("2D, Canvas, TiledMapBuilder").setMapDataSource(tilesData);

  mapBuilder.createWorld(function (map) {
    console.log("World created.");
  });

  mapBuilder.getEntitiesInLayer('Objects').forEach(function (obj) {
    obj.addComponent('Block');
  });
  mapBuilder.getEntitiesInLayer('Wall').forEach(function (obj) {
    obj.addComponent('Edge');
  });
  mapBuilder.getEntitiesInLayer('Fixed').forEach(function (obj) {
    obj.addComponent('Solid');
  });


  /*
  mapBuilder.getEntity('Door Trigger 1')
      .addComponent('TiggerArea')
      .onEnter(function () {
        Crafty('Door 1').open();
      });
      */
}

return Map;


});
