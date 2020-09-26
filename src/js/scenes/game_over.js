import Phaser from 'phaser';
import config from '../config/config';
import Btn from '../components/btn';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(600, 300, 'game_over_bg');
    this.last = this.add.text(0, 0, 'The spaceship has been killed. Humanity will learn from this process and try again.', {
      fontSize: '26px',
      fill: '#fff',
      backgoundColor: '#1d2d50',
      align: 'center',
      wordWrap: { width: 800 },
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2 - 100,
      config.width, config.height,
    );


    Phaser.Display.Align.In.Center(
      this.last,
      this.zone,
    );

    this.gameBtn = new Btn(this, config.width / 2, config.height / 2 + 100, 'start_btn', 'start_btn_hover', 'Menu');
    this.leaderboardBtn = new Btn(this, config.width / 2, config.height / 2 + 200, 'leader_btn', 'leader_btn_hover', 'Leaderboard');

    this.music = this.sys.game.globals.music;
    this.gameOverMusic = this.sound.add('game_over_audio', { volume: 1.5, loop: true });
    this.gameOverMusic.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.gameOverMusic = this.gameOverMusic;
    this.cameras.main.fadeIn(10000);
  }
}

export default GameOver;