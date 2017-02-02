import Phaser from 'phaser-ce';

class Rocket extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.anchor.setTo(0.5, 1);

    this.width = this.width * 0.8;
    this.height = this.height * 0.8;

    this.rocketFire = this.game.add.sprite(0, 0, 'rocket-fire');
    this.rocketFire.anchor.setTo(0.5, 0);
    this.rocketFire.visible = false;
    this.addChild(this.rocketFire);

    this.body.collideWorldBounds = true;

    this.isFired = false;
    this.fireTimer = 0;
  }

  update() {
    if (this.isFired) {
      this.body.velocity.y = -500;
      this.body.velocity.x = this.body.velocity.x - 1;
      this.angle = this.angle - 0.1;
    }
  }

  fire() {
    const tween = this.game.add.tween(this).to({
      x: this.x + 5,
    }, 100, Phaser.Easing.Quadratic.InOut, true, 250, 5, true);

    tween.onComplete.add(() => {
      this.rocketFire.visible = true;
      this.isFired = true;
    });
  }
}

export default Rocket;
