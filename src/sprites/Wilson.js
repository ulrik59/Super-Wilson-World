import Phaser from 'phaser-ce';

class Wilson extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    // this.animations.add('left', [0, 1, 2, 3], 10, true);
    // this.animations.add('turn', [4], 20, true);
    // this.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  // update() {
  //   this.body.velocity.x = 0;
  // }
}

export default Wilson;
