import Phaser from 'phaser';
import Player from '../objects/player';

class MainGame extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {

    // Setup the main game layout with the first stage bg image
    this.add.image(600, 300, 'stage1_bg');

    // Setup the initial audio
    this.music = this.sys.game.globals.music;
    this.bgstage1Music = this.sound.add('stage1_audio', { volume: 1.2, loop: true });
    this.bgstage1Music.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.bgStage1 = this.bgStage1;

    const menuAudio = this.scene.get('Menu');
    menuAudio.bgMusic.stop();

    this.anims.create({
      key: 'player',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      laser: this.sound.add('player_laser_audio'),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
    );

    // Add commands to the player
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // this.enemies = this.add.group();
    // this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    // Creates the events that will trigger the appearance of new enemies
  }

  update() {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    } else if (this.keyDown.isDown) {
      this.player.moveDown();
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    } else if (this.keyRight.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }

    this.playerLasers.getChildren().forEach((laser) => {
      laser.update();

      // Destroy the laser if it no longers appears on the screen of the game
      if (laser.x < -laser.displayWidth
      || laser.x > this.game.config.width + laser.displayWidth
      || laser.y < -laser.displayHeight * 4
      || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    });
  }
}

export default MainGame;