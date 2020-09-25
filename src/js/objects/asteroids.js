import Phaser from 'phaser';
import Entity from './entities';

class Asteroids extends Entity {
  constructor(scene, x, y) {
    const randomHealth = Phaser.Math.Between(1, 4);
    super(scene, x, y, `asteroid${randomHealth}`);
    this.body.velocity.y = 200;
    this.hp = randomHealth;
    this.setScale(0.075);
  }
}

export default Asteroids;