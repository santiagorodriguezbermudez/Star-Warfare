import Phaser from 'phaser';

class Btn extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, targetScene) {
    super(scene);
    this.scene = scene;
    this.y = y;
    this.x = x;

    this.button = this.scene.add.image(0, 0, key1).setInteractive();

    this.add(this.button);

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
    });

    this.scene.add.existing(this);
  }
}

export default Btn;