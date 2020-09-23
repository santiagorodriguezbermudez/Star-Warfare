import Phaser from 'phaser';
import Entity from './entities';

class Laser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'player_laser');
    this.body.velocity.y = -200;
  }
}

export default Laser;