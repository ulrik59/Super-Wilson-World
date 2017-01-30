import Phaser from 'phaser-ce';

class Wilson extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    this.facing = 'left';
    this.jumpTimer = 0;
  }

  update() {
    if (!this.body.enable) {
      return;
    }

    // this.game.physics.arcade.collide(this, this.game.layer);
    this.body.velocity.x = 0;

    if (this.game.cursors.left.isDown) {
      this.moveLeft();
    } else if (this.game.cursors.right.isDown) {
      this.moveRight();
    } else if (this.facing !== 'idle') {
      this.stopMoving();
    }

    if (this.game.spacebar.isDown) {
      this.jump();
    }
  }

  moveRight() {
    this.body.velocity.x = 150;

    if (this.facing !== 'right') {
      this.animations.play('right');
      this.facing = 'right';
    }
  }

  moveLeft() {
    this.body.velocity.x = -150;

    if (this.facing !== 'left') {
      this.animations.play('left');
      this.facing = 'left';
    }
  }

  stopMoving() {
    this.animations.stop();

    if (this.facing === 'left') {
      this.frame = 0;
    } else {
      this.frame = 5;
    }

    this.facing = 'idle';
  }

  jump() {
    if (this.body.onFloor() && this.game.time.now > this.jumpTimer) {
      this.body.velocity.y = -250;
      this.jumpTimer = this.game.time.now + 750;
    }
  }
}

export default Wilson;
