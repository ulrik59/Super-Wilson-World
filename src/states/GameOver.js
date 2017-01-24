import Phaser from 'phaser-ce';

class GameOver extends Phaser.State {
  init() {
    this.timer = 0;
  }

  create() {
    const titleText = 'Game Over';
    this.title = this.add.text(this.world.centerX, this.world.centerY, titleText);
    this.title.font = 'Bangers';
    this.title.padding.set(10, 16);
    this.title.fontSize = 90;
    this.title.fill = '#000';
    this.title.smoothed = false;
    this.title.anchor.setTo(0.5);

    const retryText = 'Press [SPACE] to retry !';
    this.retry = this.add.text(this.world.centerX, this.game.height - 80, retryText);
    this.retry.font = 'Bangers';
    this.retry.padding.set(10, 16);
    this.retry.fontSize = 30;
    this.retry.fill = '#000';
    this.retry.smoothed = false;
    this.retry.anchor.setTo(0.5);
  }

  render() {
    this.timer += this.time.elapsed;

    if (this.timer >= 500) {
      this.retry.visible = !this.retry.visible;
      this.timer = 0;
    }

    if (this.game.spacebar.isDown) {
      this.state.start('Level1');
    }
  }
}

export default GameOver;
