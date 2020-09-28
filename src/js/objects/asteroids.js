import Phaser from 'phaser';
import Entity from './entities';

class Asteroids extends Entity {
  constructor(scene, x, y) {
    const randomHealth = Phaser.Math.Between(1, 4);
    super(scene, x, y, `asteroid${randomHealth}`, 'asteroids');
    this.body.velocity.y = 200;
    this.hp = randomHealth;
  }
}

export default Asteroids;