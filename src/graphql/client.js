import { ApolloClient, createNetworkInterface } from 'react-apollo';
import config from 'config';

export default (options = {}) => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3000/graphql' || config.api
  });

  return new ApolloClient({
    networkInterface,
    ...options
  });
};
