import Phaser from 'phaser';
import Btn from '../components/btn';
import ApiModule from '../../scoreApi';


class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.music = this.sys.game.globals.music;
    this.leadersMusic = this.sound.add('leaders_audio', { volume: 1.5, loop: true });
    this.leadersMusic.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.leadersMusic = this.leadersMusic;
    const lastAudio = this.scene.get('Final').finalMusic || this.scene.get('GameOver').gameOverMusic || this.scene.get('Menu').bgMusic;

    if (lastAudio) {
      lastAudio.stop();
    }
    this.cameras.main.fadeIn(10000);
    this.cameras.main.setBackgroundColor('#fff');
    this.menuButton = new Btn(this, 500, 550, 'menu_btn', 'menu_btn_hover', 'Menu');
    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    const loadMessage = this.add.bitmapText(100, 100, 'arcade', 'Fetching highest scores...').setTint(0xff0000);
    ApiModule.readScore().then((scores) => {
      const highestValues = scores.sort((a, b) => b.score - a.score).slice(0, 5);
      loadMessage.destroy();
      highestValues.forEach((currentScore, index) => {
        this.add.bitmapText(100, 90 * (index + 1), 'arcade', ` ${index + 1}     ${currentScore.score}   ${currentScore.user}`).setTint(0xff0000);
      });
    }).catch((error) => {
      alert(`Unable to get the leaderboard: ${error}`);
    });
  }
}

export default Leaderboard;