import Phaser from 'phaser';
import config from '../config/config';
import Btn from '../components/btn';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    this.add.image(600, 300, 'main-menu-bg');
    this.add.image(config.width / 2, config.height / 2 - 100, 'start_logo');
    this.gameBtn = new Btn(this, config.width / 2, config.height / 2 + 100, 'start_btn', 'start_btn_hover', 'Intro');
    this.leaderboardBtn = new Btn(this, config.width / 2, config.height / 2 + 200, 'leader_btn', 'leader_btn_hover', 'Leaderboard');

    // this.music = this.sys.game.globals.music;
    // this.bgMusic = this.sound.add('main_menu_music', { volume: 0.5, loop: true });
    // this.bgMusic.play();
    // this.music.bgMusicPlaying = true;
    // this.sys.game.globals.bgMusic = this.bgMusic;
  }
}

export default Menu;