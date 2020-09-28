import Phaser from 'phaser';
import Entity from './entities';
import Laser from './laser';

class Ufo extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ufo', 'ufo');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const laser = new Laser(
          this.scene,
          this.x,
          this.y,
          'down',
        );
        laser.setScale(this.scaleX);
        scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.play('ufo');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export default Ufo;