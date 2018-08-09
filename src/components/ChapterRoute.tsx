import React from 'react';
import { asyncComponent } from 'react-async-component';
import { Redirect, match as matchType } from 'react-router';
import validate from '../helpers/routeFilters';
import { Location } from '../../node_modules/@types/history';

const ChapterContainer = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "Chapter" */ '../containers/ChapterContainer'),
});

type Props = {
  match: matchType<$TsFixMe>;
  location: Location;
};

const ChapterRoute: React.SFC<Props> = ({ match, location }: Props) => {
  const redirect = validate({
    params: match.params,
    location,
  });

  if (redirect) {
    return <Redirect to={redirect.url} />;
  }

  return <ChapterContainer match={match} location={location} />;
};

export default ChapterRoute;
