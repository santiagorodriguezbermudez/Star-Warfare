import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.scene.start('Load');
  }
}

export default StartScene;