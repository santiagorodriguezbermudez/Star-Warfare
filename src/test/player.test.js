import Player from '../js/objects/player';

jest.mock('../js/objects/player');

let player;

beforeEach(() => {
  player = new Player('Game', 500, 300, 'Player');
});

test('Player is an object', () => {
  expect(typeof player).toBe('object');
});

test('Player is not undefined', () => {
  expect(player).not.toBe(undefined);
});

test('Player has a constructor when it is called', () => {
  expect(Player).toHaveBeenCalled();
});