import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: 'black',
  parent: 'phaser-container',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  pixelArt: true,
  roundPixels: true,
};