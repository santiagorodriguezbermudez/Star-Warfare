import Phaser from 'phaser';
import ApiModule from '../../scoreApi';

export default class SubmitScore extends Phaser.Scene {
  constructor() {
    super('SubmitScore');
  }

  create() {
    const submitLabel = this.add.text(15, 15, 'Please enter your user: ', {
      fontSize: '24px',
      fill: '#fff',
      align: 'left',
    });

    const element = this.add.dom(400, 600).createFromCache('form_for_username');
    element.setPerspective(600);
    element.addListener('click');
    element.on('click', (event) => {
      if (event.target.name === 'confirm') {
        const username = element.getChildByName('username');
        if (username.value !== '') {
          const loadingMessage = this.add.text(350, 350, 'Please wait...', {
            fontSize: '24px',
            fill: '#fff',
            align: 'left',
          });
          ApiModule.writeScore(username.value, localStorage.getItem('score')).then(() => {
            loadingMessage.destroy();
            element.scene.scene.start('Menu');
          }).catch(() => {
            alert('Error. Unable to save your score');
          });
        } else {
          element.scene.tweens.add({
            targets: submitLabel,
            alpha: 0.1,
            duration: 300,
            ease: 'Power2',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}