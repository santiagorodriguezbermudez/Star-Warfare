import Phaser from 'phaser';
import Entity from './entities';
import Mine from './mines';
import Magnet from './magnets';

class Boss extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss', 'boss');
    this.body.collideWorldBounds = true;
    this.play('boss');
    this.setData('numberOfLives', 5);
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
      delay: 1000,
      callback: () => {
        this.body.velocity.x = Phaser.Math.Between(-350, 350);
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


  // Game Over functionality
  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.getData('numberOfLives') === 0) {
          console.log('You win');
          // Call the game over scene
        } else {
          const currentLives = this.getData('numberOfLives');
          this.setData('numberOfLives', currentLives - 1);
          this.setData('isDead', false);
          this.setVisible(true);
          this.play('boss');
        }
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export default Boss;