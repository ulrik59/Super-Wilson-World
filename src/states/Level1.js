/* globals __DEV__ */
import Phaser from 'phaser-ce';
import Wilson from '../sprites/Wilson';
import Droid from '../sprites/Droid';
import SpaceInvader from '../sprites/SpaceInvader';

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
    this.droid = new Droid({ game: this.game, x: 410, y: 176, asset: 'droid' });
    this.spaceinvader = new SpaceInvader({ game: this.game, x: 500, y: 50, asset: 'SpaceInvader' });

    this.add.existing(this.player);
    this.add.existing(this.droid);
    this.add.existing(this.spaceinvader);

    this.camera.follow(this.player);
  }

  update() {
    this.physics.arcade.collide(this.player, this.layer);
    this.physics.arcade.collide(this.droid, this.layer);
    this.physics.arcade.collide(this.spaceinvader.weapon.bullets, this.layer, bullet => bullet.kill(), null, this);
    this.physics.arcade.overlap(this.droid, this.player, this.droidOverlap, null, this);
    this.physics.arcade.overlap(this.spaceinvader.weapon.bullets, this.player, this.bulletPlayerOverlap, null, this);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32);
    }
  }

  droidOverlap() {
    if (this.player.body.touching.down) {
      this.droid.die();
      this.player.body.velocity.y = -80;
      this.time.events.add(Phaser.Timer.SECOND, () => this.droid.kill());
      return;
    }

    this.player.die();
    this.time.events.add(Phaser.Timer.SECOND, () => this.state.start('GameOver'));
  }

  bulletPlayerOverlap(player, bullet) {
    bullet.kill();
    player.die();
    this.time.events.add(Phaser.Timer.SECOND, () => this.state.start('GameOver'));
  }
}

export default Level1;
