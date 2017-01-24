/* globals __DEV__ */
import Phaser from 'phaser-ce';
import Wilson from '../sprites/Wilson';

class Level1 extends Phaser.State {
  create() {
    this.stage.backgroundColor = '#000';

    this.bg = this.add.tileSprite(0, 0, 800, 600, 'background');
    this.bg.fixedToCamera = true;

    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('tiles-1');
    this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

    this.game.layer = this.map.createLayer('Tile Layer 1');
    this.game.layer.resizeWorld();

    this.physics.arcade.gravity.y = 250;

    this.wilson = new Wilson({ game: this.game, x: 32, y: 32, asset: 'dude' });
    this.add.existing(this.wilson);

    this.camera.follow(this.wilson);
  }

  // update() {
  // }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.wilson, 32, 32);
    }
  }
}

export default Level1;
