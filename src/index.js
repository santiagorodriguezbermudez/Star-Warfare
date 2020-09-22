import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  roundPixels: true
};

const game = new Phaser.Game(config);
