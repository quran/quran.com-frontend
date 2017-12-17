const routePromises = ({ match, loadData, store }) => {
  const promises = [];

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

  return Promise.all(promises).then(data => data);
};

export default routePromises;
