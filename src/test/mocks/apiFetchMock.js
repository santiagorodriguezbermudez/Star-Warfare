const saveScore = async (name, score) => {
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/h0z4c9vjaT6T11L51p9A/scores/';

  const jsonObj = {
    name,
    score,
  };
  try {
    const resp = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObj),
    });
    if (resp.ok) {
      await resp.json();
      return '200';
    }
    throw new Error('Request Failed');
  } catch (error) {
    return 'Error found';
  }
};

export default saveScore;