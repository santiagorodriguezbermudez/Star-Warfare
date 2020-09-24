import Phaser from 'phaser';
import Entity from './entities';
import Laser from './laser';

class Player extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Player');
    this.setData('speed', 200);
    this.play('player');
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.setData('numberOfLives', 5);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  displayLives(isFirstTime) {

    if (isFirstTime) {
      for (let i = 1; i <= this.getData('numberOfLives'); i+= 1 ) {
        this.scene.image.add(750 + i, 50, 'player_live');
      }
    } else {
      for (let i = 1; i <= this.getData('numberOfLives'); i+= 1 ) {
        let image = this.scene.image.destroy(750 + i, 50, 'player_live');
      };     
    }
    for (let i = 1; i <= this.getData('numberOfLives'); i += 1) {
      this.textues.remove()
    }
  }

  // Game Over functionality
  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.getData('numberOfLives') === 0) {
          console.log('Game Over');
          // Call the game over scene
        } else {
          const currentLives = this.getData('numberOfLives');
          this.setData('numberOfLives', currentLives - 1);
          this.setData('isDead', false);
          this.setVisible(true);
          this.play('player');
        }
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const laser = new Laser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);
        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }
}

export default Player;