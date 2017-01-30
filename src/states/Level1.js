/* globals __DEV__ */
import Phaser from 'phaser-ce';
import Wilson from '../sprites/Wilson';
import Droid from '../sprites/Droid';

class Level1 extends Phaser.State {
  create() {
    this.stage.backgroundColor = '#000';

    this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.bg.fixedToCamera = true;

    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('tiles-1');
    this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    this.physics.arcade.gravity.y = 500;

    this.player = new Wilson({ game: this.game, x: 32, y: 32, asset: 'dude' });
    this.add.existing(this.player);

    this.droid = new Droid({ game: this.game, x: 410, y: 176, asset: 'droid' });
    this.add.existing(this.droid);

    this.camera.follow(this.player);
  }

  update() {
    this.physics.arcade.collide(this.player, this.layer);
    this.physics.arcade.collide(this.droid, this.layer);
    this.physics.arcade.overlap(this.player, this.droid, this.droidOverlap, null, this);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32);
    }
  }

  droidOverlap() {
    if (this.player.body.touching.down) {
      this.droid.animations.stop();
      this.droid.body.enable = false;
      this.player.body.velocity.y = -80;
      this.time.events.add(Phaser.Timer.SECOND, () => this.droid.kill());
      return;
    }

    this.player.frame = 4;
    this.player.body.enable = false;
    this.player.animations.stop();
    this.time.events.add(Phaser.Timer.SECOND, () => {
      this.state.start('GameOver');
    });
  }
}

export default Level1;
