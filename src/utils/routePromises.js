const routePromises = ({ match, loadData, store }) => {
  const promises = [];
  console.log(match, loadData, store);
  if (match && loadData) {
    loadData.forEach((connector) => {
      promises.push(
        connector({
          store,
          match,
          params: match.params,
          location: match.location
        })
      );
    });
  }

  return Promise.all(promises)
    .then(data => data)
    .catch(error => console.error(error));
};

export default routePromises;
