import Phaser from 'phaser';

function preload() {
  this.load.image('cover_pic', '../assets/bnfv.png');
}

function create() {
  this.add.image(500, 300, 'cover_pic');
}

function update() {
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);