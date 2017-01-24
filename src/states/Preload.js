import Phaser from 'phaser-ce';
import { centerGameObjects } from '../utils';

class Preload extends Phaser.State {
  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    // load all assets
    this.load.image('mushroom', 'assets/title/mushroom2.png');
    this.load.tilemap('level1', 'assets/startruck/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles-1', 'assets/startruck/tiles-1.png');
    this.load.spritesheet('dude', 'assets/startruck/dude.png', 32, 48);
    this.load.spritesheet('droid', 'assets/startruck/droid.png', 32, 32);
    this.load.image('starSmall', 'assets/startruck/star.png');
    this.load.image('starBig', 'assets/startruck/star2.png');
    this.load.image('background', 'assets/startruck/background2.png');
  }

  create() {
    this.state.start('GameTitle');
  }
}

export default Preload;
