import Phaser from 'phaser-ce';

class Droid extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.anchor.setTo(0.5, 0.5);

    this.body.collideWorldBounds = true;
    this.body.setSize(32, 32, 0, 0);

    this.animations.add('walk', [0, 1, 2, 3], 5, true);
    this.animations.play('walk');

    this.facing = 'left';
  }

  update() {
    // this.game.physics.arcade.collide(this, this.game.layer);
    this.animations.play('walk');
    this.body.velocity.x = 0;

    if (this.body.blocked.right || this.facing === 'left') {
      this.body.velocity.x = -50;
      this.scale.x = 1;
      this.facing = 'left';
    }

    if (this.body.blocked.left || this.facing === 'right') {
      this.body.velocity.x = 50;
      this.scale.x = -1;
      this.facing = 'right';
    }
  }

  die() {
    this.body.enable = false;
    this.animations.stop();
  }
}

export default Droid;
