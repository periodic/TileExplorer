define(['lib/crafty', 'lib/Tiled/tiledmapbuilder'], function (Crafty) {

Crafty.c('Wall', {
  init: function () {
    this.requires('Solid');
  },
});

Crafty.c('Fixed', {
  init: function () {
    this.requires('Solid');
  },
});

Crafty.c('Destructable', {
  init: function () {
    this.requires('Solid');
  },
  explode: function () {
    this.destroy();
  },
});

Crafty.c('ColorChanger', {
  init: function () {
    this.requires('2D,Collision,Color');
    this.onHit('Player', this.onPlayerEnter)
  },
  onPlayerEnter: function(collisions) {
    collisions.forEach(function (collision) {
      collision.obj.gun.color(this.properties.color);
    }, this);
  },
});

function Map(width_tiles, height_tiles, tilesize, tilesData) {
  tilesize = tilesize || 32;

  var mapBuilder = Crafty.e("2D, Canvas, TiledMapBuilder").setMapDataSource(tilesData);

  mapBuilder.createWorld(function (map) {
    console.log("World created.");
  });
}

return Map;


});
