import Phaser from 'phaser';
import Entity from './entities';
import Mine from './mines';
import Magnet from './magnets';

class Boss extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss', 'boss');
    this.body.collideWorldBounds = true;
    this.play('boss');
    this.shootTimer = scene.time.addEvent({
      delay: 500,
      callback: () => {
        const mine = new Mine(
          this.scene,
          this.x,
          this.y,
        );
        mine.setScale(this.scaleX);
        scene.enemies.add(mine);
      },
      callbackScope: this,
      loop: true,
    });

    this.movement = scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.body.velocity.x = Phaser.Math.Between(-350, 350);
        this.body.velocity.y = Phaser.Math.Between(-10, 10);
        const magnet = new Magnet(
          this.scene,
          this.x,
          this.y,
        );
        scene.enemies.add(magnet);
      },
      callbackScope: this,
      loop: true,
    });
  }


  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
        this.movement.remove(false);
      }
    }
  }
}

export default Boss;