import Phaser from 'phaser';
import config from '../config/config';
import Btn from '../components/btn';

class Final extends Phaser.Scene {
  constructor() {
    super('Final');
  }

  create() {
    this.add.image(600, 300, 'final_bg');
    this.last = this.add.text(0, 0, "You've made it all the way to Mars. Congratulations, you have completed your mission. There is hope for humanity.", {
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

    const scoreText = this.add.text(0, 0, `Score: ${this.score}`, {
      fontSize: '32px',
      fill: '#fff',
      backgroundColor: '#1d2d50',
      align: 'center',
    });

    const score = localStorage.getItem('score') !== null ? JSON.parse(localStorage.getItem('score')) : 0;

    scoreText.setText(`Score: ${score}`);
    this.scoreBtn = new Btn(this, config.width / 2, config.height / 2 + 50, 'score_btn', 'score_btn_hover', 'SubmitScore');
    this.gameBtn = new Btn(this, config.width / 2, config.height / 2 + 125, 'restart_btn', 'restart_btn_hover', 'Menu');
    this.leaderboardBtn = new Btn(this, config.width / 2, config.height / 2 + 200, 'leader_btn', 'leader_btn_hover', 'Leaderboard');

    Phaser.Display.Align.In.Center(
      scoreText,
      this.scoreBtn,
      0,
      -75,
    );

    this.music = this.sys.game.globals.music;
    this.finalMusic = this.sound.add('final_audio', { volume: 1.5, loop: true });
    this.finalMusic.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.finalMusic = this.finalMusic;
    this.cameras.main.fadeIn(10000);
  }
}

export default Final;