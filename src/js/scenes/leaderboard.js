import Phaser from 'phaser';
import Btn from '../components/btn';
// import { getScores } from '../leaderboard';


class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.cameras.main.setBackgroundColor('#fff');
    const loading = this.add.bitmapText(250, 250, 'arcade', 'Loading...').setTint(0xff00ff);
    this.menuButton = new Btn(this, 400, 550, 'menu_btn', 'menu_button_hover', 'Menu');
    // getScores().then((scores) => {
    //   loading.destroy();
    //   scores.sort((a, b) => b.score - a.score);
    //   this.add.bitmapText(100, 20, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
    //   for (let i = 0; i <= 4; i += 1) {
    //     this.add.bitmapText(100, 90 * (i + 1), 'arcade', ` ${i + 1}     ${scores[i].score}   ${scores[i].user}`).setTint(0xff0000);
    //   }
    // }).catch(() => {

    // });
  }
}

export default Leaderboard;