import Phaser from 'phaser';
import StartScene from './start_scene';
import LoadingScene from './loading_scene';
import MainMenu from './main_menu';
import Introduction from './intro';


class SceneController extends Phaser.Scene {
  constructor() {
    super('SceneController');
  }

  create() {
    this.scene.add('Start', new StartScene());
    this.scene.add('Load', LoadingScene);
    this.scene.add('Menu', MainMenu);
    this.scene.add('Introduction', Introduction);

    this.scene.start('Start');
  }
}

export default SceneController;