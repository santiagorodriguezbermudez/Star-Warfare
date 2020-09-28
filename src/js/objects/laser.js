import Entity from './entities';

class Laser extends Entity {
  constructor(scene, x, y, direction) {
    super(scene, x, y, 'player_laser');
    this.body.velocity.y = (direction === 'down') ? 200 : -200;
  }
}

export default Laser;