import Phaser from 'phaser-ce';
import Mushroom from '../sprites/Mushroom';

class GameTitle extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#FF0';
    this.game.world.width = this.game.width;
    this.game.world.height = this.game.height;
    this.timer = 0;
  }

  create() {
    const titleText = 'Super Wilson World';
    this.title = this.add.text(this.world.centerX, 80, titleText);
    this.title.font = 'Bangers';
    this.title.padding.set(10, 16);
    this.title.fontSize = 72;
    this.title.fill = '#000';
    this.title.smoothed = false;
    this.title.anchor.setTo(0.5);

    const startText = 'Press [SPACE] to start !';
    this.start = this.add.text(this.world.centerX, this.game.height - 80, startText);
    this.start.font = 'Bangers';
    this.start.padding.set(10, 16);
    this.start.fontSize = 30;
    this.start.fill = '#000';
    this.start.smoothed = false;
    this.start.anchor.setTo(0.5);

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom',
    });

    this.add.existing(this.mushroom);
  }

  render() {
    this.timer += this.time.elapsed;

    if (this.timer >= 500) {
      this.start.visible = !this.start.visible;
      this.timer = 0;
    }

    if (this.game.spacebar.isDown) {
      this.state.start('Level1');
    }
  }
}

export default GameTitle;
