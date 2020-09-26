import 'regenerator-runtime';


const fetch = require('node-fetch');

const ApiModule = (() => {
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/h0z4c9vjaT6T11L51p9A/scores/';
  const writeScore = async (user, score) => {
    const body = JSON.stringify({ user, score });
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const resp = await fetch(api, data);
    const res = await resp.json();
    return res;
  };

  const readScore = async () => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const resp = await fetch(api, data);
    const scores = await resp.json();
    return scores.result;
  };

  return {
    writeScore,
    readScore,
  };
})();

export default ApiModule;