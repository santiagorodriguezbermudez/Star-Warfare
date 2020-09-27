const apiTestData = (() => {
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/h0z4c9vjaT6T11L51p9A/scores/';

  const getData = () => new Promise((resolve) => {
    fetch(api)
      .then(resp => resp.json()
        .then((json) => {
          resolve(json.result);
        }));
  });

  return {
    getData,
  };
})();

export default apiTestData;