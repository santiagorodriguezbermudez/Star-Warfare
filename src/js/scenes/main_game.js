import Phaser from 'phaser';
import Player from '../objects/player';
import Garbage from '../objects/garbage';
import Asteroid from '../objects/asteroids';
import Magnet from '../objects/magnets';
import Ufo from '../objects/ufo';
import Boss from '../objects/boss';

class MainGame extends Phaser.Scene {
  constructor() {
    super('Game');
    this.live1 = null;
    this.live2 = null;
    this.live3 = null;
    this.live4 = null;
    this.live5 = null;
    this.current_stage_bg = null;
  }

  create() {
    // Setup the main game layout with the first stage bg image and user lives
    this.current_stage_bg = this.add.image(600, 300, 'stage1_bg');
    this.live1 = this.add.image(975, 25, 'player1').setDisplaySize(50, 50);
    this.live2 = this.add.image(925, 25, 'player1').setDisplaySize(50, 50);
    this.live3 = this.add.image(875, 25, 'player1').setDisplaySize(50, 50);
    this.live4 = this.add.image(825, 25, 'player1').setDisplaySize(50, 50);
    this.live5 = this.add.image(772, 25, 'player1').setDisplaySize(50, 50);

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

    // Creates Garbage animation
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

    // Ufo animation
    this.anims.create({
      key: 'ufo',
      frames: [
        { key: 'ufo1' },
        { key: 'ufo2' },
        { key: 'ufo3' },
        { key: 'ufo4' },
      ],
      frameRate: 20,
      repeat: -1,
    });

    // Boss animation
    this.anims.create({
      key: 'boss',
      frames: [
        { key: 'boss1' },
        { key: 'boss2' },
        { key: 'boss3' },
        { key: 'boss4' },
        { key: 'boss5' },
      ],
      frameRate: 20,
      repeat: -1,
    });

    // Mine animation
    this.anims.create({
      key: 'mine',
      frames: [
        { key: 'mine1' },
        { key: 'mine2' },
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
    // this.time.addEvent({
    //   delay: 1500,
    //   callback: () => {
    //     const enemy = new Garbage(
    //       this,
    //       Phaser.Math.Between(0, this.game.config.width),
    //       0,
    //     );
    //     enemy.body.setSize(enemy.body.width, enemy.body.height);
    //     enemy.setScale(Phaser.Math.Between(4, 7) * 0.1);
    //     this.enemies.add(enemy);
    //   },
    //   callbackScope: this,
    //   repeat: 30,
    // });

    // Second wave of garbage
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: () => {
    //     const enemy = new Garbage(
    //       this,
    //       Phaser.Math.Between(0, this.game.config.width),
    //       0,
    //     );

    //     enemy.body.setSize(enemy.body.width, enemy.body.height);
    //     enemy.setScale(Phaser.Math.Between(4, 7) * 0.1);
    //     this.enemies.add(enemy);
    //   },
    //   callbackScope: this,
    //   repeat: 30,
    // });

    // Third wave of garbage
    // this.time.addEvent({
    //   delay: 500,
    //   callback: () => {
    //     const enemy = new Garbage(
    //       this,
    //       Phaser.Math.Between(0, this.game.config.width),
    //       0,
    //     );

    //     enemy.body.setSize(enemy.body.width, enemy.body.height);
    //     enemy.setScale(Phaser.Math.Between(5, 8) * 0.2);
    //     this.enemies.add(enemy);
    //   },
    //   callbackScope: this,
    //   repeat: 60,
    // });

    // Change of scenario to second scenario
    // this.time.addEvent({
    //   delay: 3000,
    //   callback: () => {
    //     if (this.player.getData('numberOfLives') > 0) {
    //       this.cameras.main.fadeOut(3000);
    //       this.createSecondStage();
    //     }
    //   },
    //   callbackScope: this,
    //   repeat: 0,
    // });

    // Change of scenario to ufo scenario
    // this.time.addEvent({
    //   delay: 3000,
    //   callback: () => {
    //     if (this.player.getData('numberOfLives') > 0) {
    //       this.cameras.main.fadeOut(3000);
    //       this.createThirdStage();
    //     }
    //   },
    //   callbackScope: this,
    //   repeat: 0,
    // });

    // Change of scenario to boss scenario
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.player.getData('numberOfLives') > 0) {
          this.cameras.main.fadeOut(3000);
          this.createBoss();
        }
      },
      callbackScope: this,
      repeat: 0,
    });

    // Collision conditionals
    // Player Laser and enemies
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        enemy.setData('numberOfLives', enemy.getData('numberOfLives') - 1);
        playerLaser.destroy();
        console.log(`${enemy.getData('type')} has lives ${enemy.getData('numberOfLives')}}`);
        if (enemy.getData('numberOfLives') === 0) {
          enemy.explode(true);
        }
      }
    });

    // Collision conditionals
    // Player Laser and enemies
    this.physics.add.collider(this.player, this.enemyLasers, (player, enemyLaser) => {
      if (!player.getData('isDead')) {
        this.player.setData('numberOfLives', this.player.getData('numberOfLives') - 1);
        enemyLaser.explode(true);
        if (this.player.getData('numberOfLives') === 0) {
          player.explode(false);
          player.onDestroy();
        }
      }
    });

    // Overlap conditionals between the player and the enemies
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
      && !enemy.getData('isDead')) {
        this.player.setData('numberOfLives', this.player.getData('numberOfLives') - 1);
        enemy.explode(true);
        if (this.player.getData('numberOfLives') === 0) {
          player.explode(false);
          player.onDestroy();
        }
      }
    });
  }

  createSecondStage() {
    this.current_stage_bg.destroy();
    this.current_stage_bg = this.add.image(600, 300, 'stage2_bg');
    this.current_stage_bg.setDepth(-1000);
    this.cameras.main.fadeIn(1000);

    // Second type of enemies, the asteroids
    this.time.addEvent({
      delay: 400,
      callback: () => {
        const startWall = Phaser.Math.Between(0, 250);
        const numberOfAsteroids = Phaser.Math.Between(0, 35);
        for (let i = startWall; i <= (startWall + (32 * numberOfAsteroids)); i += 32) {
          const enemy = new Asteroid(
            this,
            i,
            0,
          );
          // Creates asteroids aninmation
          this.tweens.add({
            key: 'asteroid_animation_tween',
            targets: enemy,
            duration: 2000,
            rotation: 2,
            repeat: -1,
          });
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      repeat: 1,
    });
  }

  createThirdStage() {
    this.current_stage_bg.destroy();
    this.current_stage_bg = this.add.image(600, 300, 'stage3_bg');
    this.current_stage_bg.setDepth(-1000);
    this.cameras.main.fadeIn(1000);

    // Third type of enemies, UFO + magnets
    this.time.addEvent({
      delay: 500,
      callback: () => {
        const ufo = new Ufo(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        this.enemies.add(ufo);
        if (this.getNumberOfEnemies('magnet') < 9) {
          const magnet = new Magnet(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          this.enemies.add(magnet);
        }
      },
      callbackScope: this,
      repeat: 90,
    });
  }

  createBoss() {
    this.current_stage_bg.destroy();
    this.current_stage_bg = this.add.image(600, 300, 'stage4_bg');
    this.current_stage_bg.setDepth(-1000);
    this.cameras.main.fadeIn(1000);

    // Third type of enemies, UFO + magnets
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        const boss = new Boss(
          this,
          500,
          150,
        );
        this.enemies.add(boss);
        boss.body.setSize(boss.body.width, boss.body.height);
      },
      callbackScope: this,
      repeat: 0,
    });
  }

  getNumberOfEnemies(type) {
    return this.enemies.getChildren().filter(enemy => enemy.getData('type') === type).length;
  }

  update() {
    switch (this.player.getData('numberOfLives')) {
      case 4:
        this.live5.destroy();
        break;
      case 3:
        this.live4.destroy();
        break;
      case 2:
        this.live3.destroy();
        break;
      case 1:
        this.live2.destroy();
        break;
      case 0:
        this.live1.destroy();
        break;
      default:
    }
    if (!this.player.getData('isDead')) {
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