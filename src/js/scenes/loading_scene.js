import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  constructor() {
    super('Load');
  }

  create() {
    this.add.image(500, 300, 'start_logo');
  }

  preload() {
    // Create first logo of the game for loading time showup
    this.load.image('start_logo', 'src/assets/images/start_logo.png');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xff9900, 0.8);
    progressBox.fillRect(250, 270, 500, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#FF8C00',
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

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#FF8C00',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xff9900, 1);
      progressBar.fillRect(255, 280, 490 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.ready();
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // Download all of the images first
    // Background assets
    this.load.image('main_menu_bg', 'src/assets/images/main-menu-bg.jpg');
    this.load.image('stage1_bg', 'src/assets/images/stage1.jpg');
    this.load.image('stage2_bg', 'src/assets/images/stage2.jpg');
    this.load.image('stage3_bg', 'src/assets/images/stage3.jpg');
    this.load.image('stage4_bg', 'src/assets/images/stage4.jpg');
    this.load.image('final_bg', 'src/assets/images/final_scene.jpg');
    this.load.image('game_over_bg', 'src/assets/images/game_over_bg.jpg');

    // Player assets
    this.load.image('player_laser', 'src/assets/images/player_laser.png');
    this.load.image('player_live', 'src/assets/images/player_live.png');
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((el) => this.load.image(`player${el}`, `src/assets/images/animation_player/${el}.png`));

    // Enemies assets
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((el) => this.load.image(`garbage${el}`, `src/assets/images/animation_garbage/garbage_${el}.png`));
    [1, 2, 3, 4].forEach((el) => this.load.image(`asteroid${el}`, `src/assets/images/asteroids/asteroid${el}.png`));
    this.load.image('magnet', 'src/assets/images/magnet/magnet.png');
    [1, 2, 3, 4].forEach((el) => this.load.image(`ufo${el}`, `src/assets/images/animation_ufo/${el}.png`));
    [1, 2, 3, 4, 5].forEach((el) => this.load.image(`boss${el}`, `src/assets/images/animation_boss/${el}.png`));
    [1, 2].forEach((el) => this.load.image(`mine${el}`, `src/assets/images/animation_mines/${el}.png`));

    // Game assets
    this.load.image('start_btn', 'src/assets/images/start_btn.png');
    this.load.image('start_btn_hover', 'src/assets/images/start_btn_hover.png');
    this.load.image('leader_btn', 'src/assets/images/leader_btn.png');
    this.load.image('leader_btn_hover', 'src/assets/images/leader_btn_hover.png');
    this.load.image('score_btn', 'src/assets/images/score_btn.png');
    this.load.image('score_btn_hover', 'src/assets/images/score_btn_hover.png');
    this.load.image('restart_btn', 'src/assets/images/restart_btn.png');
    this.load.image('restart_btn_hover', 'src/assets/images/restart_btn_hover.png');
    this.load.html('form_for_username', 'src/assets/form/form_for_username.html');
    this.load.bitmapFont('arcade', 'src/assets/font/arcade.png', 'src/assets/font/arcade.xml');
    this.load.image('menu_btn', 'src/assets/images/menu_btn.png');
    this.load.image('menu_btn_hover', 'src/assets/images/menu_btn_hover.png');

    // Other animations
    this.load.spritesheet('animationExplosion', 'src/assets/images/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Download all of the audios
    // Scenes
    this.load.audio('menu_audio', ['src/assets/audio/menu_audio.mp3']);
    this.load.audio('stage1_audio', ['src/assets/audio/stage1_audio.mp3']);
    this.load.audio('final_audio', ['src/assets/audio/final_audio.mp3']);
    this.load.audio('game_over_audio', ['src/assets/audio/game_over.mp3']);
    this.load.audio('leaders_audio', ['src/assets/audio/leaders.mp3']);

    // Dowload audios
    // Player Audios
    this.load.audio('player_laser_audio', ['src/assets/audio/player_laser.ogg']);

    // Explosion audios
    [1, 2, 3].forEach((el) => this.load.audio(`explosion${el}`, `src/assets/audio/explosion${el}.mp3`));
  }

  ready() {
    this.scene.start('Menu');
  }
}

export default LoadingScene;