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

    this.gameBtn = new Btn(this, config.width / 2, config.height / 2 + 100, 'start_btn', 'start_btn_hover', 'Menu');
    this.leaderboardBtn = new Btn(this, config.width / 2, config.height / 2 + 200, 'leader_btn', 'leader_btn_hover', 'Leaderboard');

    this.music = this.sys.game.globals.music;
    this.finalMusic = this.sound.add('final_audio', { volume: 1.5, loop: true });
    this.finalMusic.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.finalMusic = this.finalMusic;
    this.cameras.main.fadeIn(10000);
  }
}

export default Final;