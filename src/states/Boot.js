import Phaser from 'phaser-ce';
import WebFont from 'webfontloader';

class Boot extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#FF0';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: this.fontsLoaded,
    });

    const text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', {
      font: '16px Arial',
      fill: '#DDD',
      align: 'center',
    });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/loading/loader-bg.png');
    this.load.image('loaderBar', './assets/loading/loader-bar.png');
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.cursors = this.input.keyboard.createCursorKeys();
    this.game.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  render() {
    if (this.fontsReady) {
      this.state.start('Preload');
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}

export default Boot;
