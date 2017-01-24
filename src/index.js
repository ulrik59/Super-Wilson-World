import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import GameTitleState from './states/GameTitle';
import Level1State from './states/Level1';
import GameOverState from './states/GameOver';

import config from './config';

class SuperWilsonWorld extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('GameTitle', GameTitleState, false);
    this.state.add('Level1', Level1State, false);
    this.state.add('GameOver', GameOverState, false);

    this.state.start('Boot');
  }
}

window.game = new SuperWilsonWorld();
