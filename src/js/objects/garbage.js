import Phaser from 'phaser';
import Entity from './entities';

class Garbage extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Garbage');
    this.body.velocity.y = Phaser.Math.Between(20, 150);
    this.play('garbage');
  }
}

export default Garbage;