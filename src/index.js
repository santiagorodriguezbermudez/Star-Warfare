import Phaser from 'phaser';
import config from './js/config/config';
import Controller from './js/scenes/controller';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Controller', new Controller());
    this.scene.start('Controller');
  }
}

const game = new Game(); /* eslint-disable-line */