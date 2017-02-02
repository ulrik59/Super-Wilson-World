/* globals __DEV__ */
import Phaser from 'phaser-ce';
import Wilson from '../sprites/Wilson';
import Droid from '../sprites/Droid';
import SpaceInvader from '../sprites/SpaceInvader';
import Rocket from '../sprites/Rocket';

class Level1 extends Phaser.State {
  create() {
    this.stage.backgroundColor = '#FF0';

    // this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    // this.bg.fixedToCamera = true;

    // this.map = this.add.tilemap('level1_startruck');
    // this.map.addTilesetImage('tiles-1_startruck');
    // this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

    // this.layer = this.map.createLayer('Tile Layer 1');
    // this.layer.resizeWorld();

    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('Brique2', 'brique');
    this.map.addTilesetImage('Bloc_sol_2', 'bloc_sol');
    this.map.addTilesetImage('rocket-bloc');
    this.map.addTilesetImage('pipe');
    this.map.setCollisionByExclusion([]);

    this.layer = this.map.createLayer('Level1-Layer');
    this.layer.resizeWorld();

    this.physics.arcade.gravity.y = 500;

    this.player = new Wilson({ game: this.game, x: 32, y: 1488, asset: 'dude' });
    this.droid = new Droid({ game: this.game, x: 1800, y: 1488, asset: 'droid' });
    this.spaceinvader = new SpaceInvader({ game: this.game, x: 2650, y: 1160, asset: 'SpaceInvader' });
    this.rocket = new Rocket({ game: this.game, x: 3000, y: 1488, asset: 'rocket-still' });

    this.add.existing(this.player);
    this.add.existing(this.droid);
    this.add.existing(this.spaceinvader);
    this.add.existing(this.rocket);

    this.camera.follow(this.player);
    this.inRocket = false;
    this.rocketTimer = 0;
  }

  update() {
    this.physics.arcade.collide(this.player, this.layer);
    this.physics.arcade.collide(this.droid, this.layer);
    this.physics.arcade.collide(this.rocket, this.layer);
    this.physics.arcade.collide(this.spaceinvader.weapon.bullets, this.layer, bullet => bullet.kill(), null, this);
    this.physics.arcade.overlap(this.droid, this.player, this.droidOverlap, null, this);
    this.physics.arcade.overlap(this.spaceinvader.weapon.bullets, this.player, this.bulletPlayerOverlap, null, this);
    this.physics.arcade.overlap(this.rocket, this.player, this.rocketOverlap, null, this);

    if (this.inRocket && this.time.now >= this.rocketTimer) {
      this.state.start('GameTitle');
    }
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

  rocketOverlap() {
    this.player.die();
    this.rocket.addChild(this.player);
    this.player.x = -18;
    this.player.y = -249;
    this.player.width = this.player.width * 1.2;
    this.player.height = this.player.height * 1.2;
    this.rocket.fire();
    this.camera.follow(this.rocket);
    this.inRocket = true;
    this.rocketTimer = this.time.now + 3500;
  }
}

export default Level1;
