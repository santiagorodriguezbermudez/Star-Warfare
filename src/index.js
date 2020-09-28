import Phaser from 'phaser';
import config from './js/config/config';
import SceneController from './js/scenes/scene_controller';
import Audio from './js/objects/audio';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('SceneController', new SceneController());
    this.scene.start('SceneController');

    const music = new Audio();
    this.globals = { music, bgMusic: null };
  }
}

const game = new Game(); /* eslint-disable-line */