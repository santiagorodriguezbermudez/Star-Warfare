import Phaser from 'phaser';
import Entity from './entities';

class Mine extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'mine');
    this.play('mine');
    this.body.velocity.y = Phaser.Math.Between(50, 350);
    this.body.velocity.x = Phaser.Math.Between(-50, 50);
  }
}

export default Mine;