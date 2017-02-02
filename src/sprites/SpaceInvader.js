import Phaser from 'phaser-ce';

class SpaceInvader extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.game.add.tween(this).to({ y: y + 10 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

    this.weapon = this.game.add.weapon(1, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletAngleOffset = 90;
    this.weapon.bulletSpeed = 400;
    this.weapon.fireAngle = Phaser.ANGLE_DOWN;
    this.weapon.trackSprite(this, 33, 48);

    this.fireTimer = 0;
  }

  update() {
    if (this.game.time.now > this.fireTimer) {
      this.weapon.fire();
      this.fireTimer = this.game.time.now + 1000;
    }
  }
}

export default SpaceInvader;
