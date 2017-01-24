/* globals __DEV__ */
import Phaser from 'phaser-ce';
// import Wilson from '../sprites/Wilson';

class Level1 extends Phaser.State {
  init() {
    this.map = null;
    this.tileset = null;
    this.layer = null;
    this.wilson = null;
    this.facing = 'left';
    this.jumpTimer = 0;
    this.cursors = null;
    this.jumpButton = null;
    this.bg = null;
  }

  create() {
    this.stage.backgroundColor = '#000';

    this.bg = this.add.tileSprite(0, 0, 800, 600, 'background');
    this.bg.fixedToCamera = true;

    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('tiles-1');
    this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    this.physics.arcade.gravity.y = 250;

    this.wilson = this.add.sprite(32, 32, 'dude');
    this.physics.enable(this.wilson, Phaser.Physics.ARCADE);

    this.wilson.body.bounce.y = 0.2;
    this.wilson.body.collideWorldBounds = true;
    this.wilson.body.setSize(20, 32, 5, 16);

    this.wilson.animations.add('left', [0, 1, 2, 3], 10, true);
    this.wilson.animations.add('turn', [4], 20, true);
    this.wilson.animations.add('right', [5, 6, 7, 8], 10, true);

    this.camera.follow(this.wilson);
  }

  update() {
    const cursors = this.game.cursors;
    const wilson = this.wilson;

    this.physics.arcade.collide(this.wilson, this.layer);
    wilson.body.velocity.x = 0;

    if (cursors.left.isDown) {
      wilson.body.velocity.x = -150;

      if (this.facing !== 'left') {
        wilson.animations.play('left');
        this.facing = 'left';
      }
    } else if (cursors.right.isDown) {
      wilson.body.velocity.x = 150;

      if (this.facing !== 'right') {
        wilson.animations.play('right');
        this.facing = 'right';
      }
    } else if (this.facing !== 'idle') {
      wilson.animations.stop();

      if (this.facing === 'left') {
        wilson.frame = 0;
      } else {
        wilson.frame = 5;
      }

      this.facing = 'idle';
    }

    if (this.game.spacebar.isDown && wilson.body.onFloor() && this.time.now > this.jumpTimer) {
      this.wilson.body.velocity.y = -250;
      this.jumpTimer = this.time.now + 750;
    }
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.wilson, 32, 32);
    }
  }
}

export default Level1;
