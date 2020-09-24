import Phaser from 'phaser';
import Player from '../objects/player';
import Garbage from '../objects/garbage';

class MainGame extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // Setup the main game layout with the first stage bg image
    this.add.image(600, 300, 'stage1_bg');

    // Setup the initial audio in the background
    this.music = this.sys.game.globals.music;
    this.bgstage1Music = this.sound.add('stage1_audio', { volume: 1.2, loop: true });
    this.bgstage1Music.play();
    this.music.bgMusicPlaying = true;
    this.sys.game.globals.bgStage1 = this.bgStage1;
    this.scene.get('Menu').bgMusic.stop();

    // Creates player and enemies animations
    // Player animation
    this.anims.create({
      key: 'player',
      frames: [
        { key: 'player1' },
        { key: 'player2' },
        { key: 'player3' },
        { key: 'player4' },
        { key: 'player5' },
        { key: 'player6' },
        { key: 'player7' },
        { key: 'player8' },
      ],
      frameRate: 20,
      repeat: -1,
    });

    // Creates Garbage aninmation
    this.anims.create({
      key: 'garbage',
      frames: [
        { key: 'garbage0' },
        { key: 'garbage1' },
        { key: 'garbage2' },
        { key: 'garbage3' },
        { key: 'garbage4' },
        { key: 'garbage5' },
        { key: 'garbage6' },
        { key: 'garbage7' },
        { key: 'garbage8' },
        { key: 'garbage9' },
        { key: 'garbage10' },
        { key: 'garbage11' },
        { key: 'garbage12' },
        { key: 'garbage13' },
        { key: 'garbage14' },
        { key: 'garbage15' },
        { key: 'garbage16' },
      ],
      frameRate: 20,
      repeat: -1,
    });

    // Explosion animation
    this.anims.create({
      key: 'animationExplosion',
      frames: this.anims.generateFrameNumbers('animationExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    // Sound effects
    this.sfx = {
      laser: this.sound.add('player_laser_audio'),
      explosions: [
        this.sound.add('explosion1'),
        this.sound.add('explosion2'),
        this.sound.add('explosion3'),
      ],
    };

    // Create Player entity
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
    );

    this.player.body.setSize(this.player.body.width, this.player.body.height);

    // Add commands to the player
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create groups of entities
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    // Creates the events that will trigger the appearance of new enemies
    // First wave of garbage
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        const enemy = new Garbage(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        enemy.body.setSize(enemy.body.width, enemy.body.height);
        enemy.setScale(Phaser.Math.Between(4, 7) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      repeat: 30,
    });

    // Second wave of garbage
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const enemy = new Garbage(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );

        enemy.body.setSize(enemy.body.width, enemy.body.height);
        enemy.setScale(Phaser.Math.Between(4, 7) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      repeat: 30,
    });

    // Second wave of garbage
    this.time.addEvent({
      delay: 500,
      callback: () => {
        const enemy = new Garbage(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );

        enemy.body.setSize(enemy.body.width, enemy.body.height);
        enemy.setScale(Phaser.Math.Between(5, 8) * 0.2);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      repeat: 60,
    });

    // Collision conditionals
    // Player Laser and enemies
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    // Overlap conditionals between the player and the enemies
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
      && !enemy.getData('isDead')) {
        player.explode(true);
        enemy.explode(true);
      }
    });
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

    // Destroy the laser if it no longers appears on the screen of the game
    this.playerLasers.getChildren().forEach((laser) => {
      laser.update();

      if (laser.x < -laser.displayWidth
      || laser.x > this.game.config.width + laser.displayWidth
      || laser.y < -laser.displayHeight * 4
      || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    });

    // Destroy enemies when they are no longer on the screen
    this.enemies.getChildren().forEach((enemy) => {
      enemy.update();
      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    });
  }
}

export default MainGame;