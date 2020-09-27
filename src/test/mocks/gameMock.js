import Phaser from 'phaser';
import StartScene from './start_scene';
import LoadingScene from './loading_scene';
import MainMenu from '../../js/scenes/main_menu';
import Introduction from '../../js/scenes/intro';
import MainGame from '../../js/scenes/main_game';
import Final from '../../js/scenes/final_scene';
import GameOver from '../../js/scenes/game_over';
import SubmitScore from '../../js/scenes/submit_score';
import Leaderboard from '../../js/scenes/leaderboard';

const game = (() => {
  const config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 720,
    parent: 'divld',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 400 },
        debug: false,
      },
    },
    scene: [LoadingScene,
      MainMenu,
      MainGame,
      Introduction,
      Leaderboard,
      GameOver,
      Final,
      SubmitScore,
      StartScene,
    ],
  };

  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);
  return { game };
})();

export default game;