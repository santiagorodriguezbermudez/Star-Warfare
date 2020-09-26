import Phaser from 'phaser';
import StartScene from './start_scene';
import LoadingScene from './loading_scene';
import MainMenu from './main_menu';
import Introduction from './intro';
import MainGame from './main_game';
import Final from './final_scene';
import GameOver from './game_over';
import SubmitScore from './submit_score';


class SceneController extends Phaser.Scene {
  constructor() {
    super('SceneController');
  }

  create() {
    this.scene.add('Start', new StartScene());
    this.scene.add('Load', LoadingScene);
    this.scene.add('Menu', MainMenu);
    this.scene.add('Introduction', Introduction);
    this.scene.add('Final', Final);
    this.scene.add('GameOver', GameOver);
    this.scene.add('Game', MainGame);
    this.scene.add('SubmitScore', SubmitScore);
    this.scene.start('Start');
  }
}

export default SceneController;