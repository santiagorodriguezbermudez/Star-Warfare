
import getScores from './mocks/scoreMock';
import '@babel/polyfill';


test('Gets the names of the score and an object', async () => {
  const scores = await getScores();

  expect(scores.user).toEqual('testUsername');
  expect(typeof getScores()).toBe('object');
});

test('Gets the data from the Leaderboard', async () => {
  const scores = await getScores();

  expect(scores.score).toEqual(1000);
  expect(getScores()).not.toBe(undefined);
});