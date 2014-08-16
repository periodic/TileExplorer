Crafty.c('Player', {
  _tilesize: 32,
  init: function () {
    this.requires('2D, Canvas, Color, Fourway, Collision')
      .fourway(4)
      .attr({
        w: this._tilesize,
        h: this._tilesize,
      })
      .color('red')
      .onHit('Solid', this.stopMovement)
      .bind('NewDirection', this.directionChanged);
      this.gun = Crafty.e('Gun');
      this.attach(this.gun);

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
  },
  directionChanged: function(dir) {
    if (dir.x == 0 && dir.y == 0) return;

    var x_dir = dir.x != 0 ? dir.x / Math.abs(dir.x) : 0;
    var y_dir = dir.y != 0 ? dir.y / Math.abs(dir.y) : 0;

    this._direction = {
      x: x_dir,
      y: y_dir,
    };

    var center = {
      x: this.x + 0.5 * this.w - 0.5 * this.gun.w,
      y: this.y + 0.5 * this.h - 0.5 * this.gun.h,
    };
    this.gun.x = center.x + x_dir * 0.5 * (this.w + this.gun.w);
    this.gun.y = center.y + y_dir * 0.5 * (this.h + this.gun.h);
  },
  fire: function () {
    console.log('Firing gun!');
    this.gun.fire(this._direction);
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
    console.log('Creating bullet.');
    var bullet = Crafty.e('Bullet')
      .attr({
        x: this.x,
        y: this.y,
      })
      .fire(dir);
  },
});

Crafty.c('Bullet', {
  _speed: 20,
  init: function() {
    this.requires('2D, Canvas, Color, Collision')
    .color('yellow')
    .attr({
      w: 10,
      h: 10,
    })
    .bind('EnterFrame', this.enterFrame)
    .onHit('Solid', this.hitSolid);
  },
  enterFrame: function () {
    this.shift({
      x: this._speed * this._direction.x,
      y: this._speed * this._direction.y,
    });
  },
  fire: function(dir) {
    console.log('Bullet fired.');
    this._direction = dir;
  },
  hitSolid: function (solid) {
    if (!solid.has('Edge')) {
      solid.explode();
    }

    this.destroy();
  }
});
