define(['lib/crafty'], function (Crafty) {

console.log("Loading Player.");

Crafty.sprite(48, 'sprites/spaceship_game_sprites.png', {
  'PlayerSprite': [3,0]
})

function center(entity) {
  return {
    x: entity.x + entity.w,
    y: entity.y + entity.h,
  };
};

Crafty.c('Player', {
  _tilesize: 32,
  init: function () {
    this.requires('2D, Canvas, Fourway, Collision, SpriteAnimation, PlayerSprite')
      .fourway(4)
      .attr({
        w: this._tilesize,
        h: this._tilesize,
        z: 100,
      }).onHit('Solid', this.stopMovement)
      .bind('NewDirection', this.directionChanged)
      .origin(this._w / 2, this._h /2) 
      .reel('PlayerWalking', 500, [
        [0,3], [1,3], [2,3], [3,3],
        [0,4], [1,4], [2,4], [3,4],
      ])
      .animate('PlayerWalking', -1)
      .pauseAnimation();

    // Sprite is oriented down.
    this.baseVec = new Crafty.math.Vector2D(0, 1);
    this._direction = [0, 1];

    this.gun = Crafty.e('Gun');
    this.attach(this.gun);
    this.gun.x = this.x + 0.5 * this.w - 0.5 * this.gun.w;
    this.gun.y = this.y + this.h;

    this.bind('KeyDown', function(e) {
      if (e.key == Crafty.keys.SPACE) {
        this.fire();
      }
    });
  },
  at: function (x, y, tilesize) {
    this.tilesize = tilesize || this._tilesize;
    this.attr({
      x: this.tilesize * x,
      y: this.tilesize * y,
    });
    return this;
  },
  directionChanged: function(dir) {
    if (dir.x == 0 && dir.y == 0) {
      this.resetAnimation();
      this.pauseAnimation();
      return;
    }

    this.resumeAnimation();

    var x_dir = dir.x != 0 ? dir.x / Math.abs(dir.x) : 0;
    var y_dir = dir.y != 0 ? dir.y / Math.abs(dir.y) : 0;

    this._direction = {
      x: x_dir,
      y: y_dir,
    };

    var vec = new Crafty.math.Vector2D(x_dir, y_dir);
    this.rotation = Crafty.math.radToDeg(this.baseVec.angleBetween(vec));

    return this;
  },
  fire: function () {
    this.gun.fire(this._direction);
    return this;
  },
  stopMovement: function () {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
});

Crafty.c('Gun', {
  _w: 10,
  _h: 10,
  init: function() {
    this.requires('2D, Canvas, Color')
      .attr({
        x: 0,
        y: 0,
        w: 10,
        h: 10,
      })
      .color('yellow');
  },
  fire: function (dir) {
    var bullet = Crafty.e('Bullet')
      .color(this.color())
      .attr({
        x: this.x,
        y: this.y,
      })
      .fire(dir);
    return this;
  },
});

Crafty.c('Bullet', {
  _speed: 10,
  init: function() {
    this.requires('2D, Canvas, Color, Collision')
    .attr({
      w: 10,
      h: 10,
    })
    .bind('EnterFrame', this.enterFrame)
    .onHit('Solid', this.hitSolid);
  },
  enterFrame: function (e) {
    this.x = this.x + this._direction.x * this._speed;
    this.y = this.y + this._direction.y * this._speed;
  },
  fire: function(dir) {
    this._direction = dir;
    return this;
  },
  hitSolid: function (collisions) {
    collisions.forEach(function (collision) {
      if (collision.obj.has('Destructable')) {
        collision.obj.explode();
        Crafty.trigger('UpdateScore');
      }
    });

    this.destroy();
  }
});

return {};

}); // define
