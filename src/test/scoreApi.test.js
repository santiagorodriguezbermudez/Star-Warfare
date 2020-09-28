import Req from './mocks/apiReqMock';
import saveScore from './mocks/apiFetchMock';
import '@babel/polyfill';
import 'regenerator-runtime';


test('Test to see if the input for the API works', () => {
  const score = saveScore('testUserNameScore', 1000);
  score.then(result => {
    expect(result).toBe('200');
  }).catch(() => 'Error found');
});

test('Test to see if there is any data coming from the API', () => {
  const api = Req.getData();
  api.then(result => {
    expect(result[0].user).toBe('testUserNameScore');
  });
});