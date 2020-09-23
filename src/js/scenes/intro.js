import Phaser from 'phaser';
import config from '../config/config';

class Introduction extends Phaser.Scene {
  constructor() {
    super('Introduction');
  }

  create() {
    // Skips the intro in case the user wants to continue
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipIntro = this.add.text(10, 10, 'Press Space to skip', { fontSize: '10px', fill: '#fff' });
    this.cameras.main.setBackgroundColor('#000');
    const storyArray = ["It is the year 2025. Space X, in collaboration with Nasa, has been able to develop a spaceship with the capacity to travel all the way to Mars. Once thought a lunatic, Elon Musk, leads a new adventure and becomes humanity's hope for a better future. On earth, global warming has reached a critical point and thus, the earth will no longer be viable to live in. Mars has become our only hope if we want humanity to survive.",
      'Elon Musk has reached out to you because of your awesome ability to procrastinate important work playing arcade games.',
      "You'll lead team Mars by navigating our spaceship into the wild and dark space. Our research shows that you’ll have to fight through several obstacles to complete your mission.",
      "To make things worst, Robo-Mars, the autonomous spaceship that had all of the supplies for the return journey has been hit by an asteroid, leaving supplies all over the universe. Surprisingly, they kept their position and thus your spaceship can recollect them on your way to Mars. The more supplies you capture, the more you'll be likely to have enough resources for the return trip.",
      'Do you think you can lead your team into Mars? Press Space bar to start',
    ];

    this.intro = this.add.text(0, 0, '', {
      fontSize: '26px',
      fill: '#fff',
      align: 'center',
      wordWrap: { width: 800 },
    });

    storyArray.forEach((story, i) => {
      setTimeout(() => {
        this.intro.text = story;
        this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

        Phaser.Display.Align.In.Center(
          this.intro,
          this.zone,
        );

        this.cameras.main.once('camerafadeincomplete', () => {
          this.cameras.main.fadeOut(5000);
        });

        this.cameras.main.fadeIn(10000);
      }, i * 15000);
    });
  }

  update() {
    // Creates the update command in case the user wants to skip the introduction.
    if (this.keySpace.isDown) {
      // console.log('Start the game');
    }
  }
}

export default Introduction;