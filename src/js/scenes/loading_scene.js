import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  constructor() {
    super('Load');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xff9900, 1);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '##FF8C00',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xff9900, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // Download all of the images first
    this.load.image('main-menu-bg', 'src/assets/images/main-menu-bg.jpg');
    this.load.image('start_logo', 'src/assets/images/start_logo.png');
    this.load.image('start_btn', 'src/assets/images/start_btn.png');
    this.load.image('start_btn_hover', 'src/assets/images/start_btn_hover.png');
    this.load.image('leader_btn', 'src/assets/images/leader_btn.png');
    this.load.image('leader_btn_hover', 'src/assets/images/leader_btn_hover.png');

    // Download all of the audios
    this.load.audio('menu_audio', ['src/assets/audio/menu_audio.mp3']);
  }

  ready() {
    this.scene.start('Menu');
  }
}

export default LoadingScene;