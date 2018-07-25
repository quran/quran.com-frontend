import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { VerseShape } from '../../shapes';

const Label = styled.span`
  padding: 0.65em 1.1em;
  border-radius: 0;
  display: inline-block;
  margin-bottom: 15px;
  font-weight: 300;
  color: ${props => props.theme.textColor};
  &:hover {
    opacity: 0.7;
  }
`;

const propTypes = {
  isSearched: PropTypes.bool,
  verse: VerseShape.isRequired,
};

type Props = {
  isSearched?: boolean,
  verse: VerseShape,
};

const Badge: React.SFC<Props> = ({ isSearched, verse }: Props) => {
  const translations = (verse.translations || [])
    .map(translation => translation.resourceId)
    .join(',');
  let metric;

  const content = (
    <h4>
      <Label className="label label-default">{verse.verseKey}</Label>
    </h4>
  );

  if (isSearched) {
    metric = 'Verse:Searched:Link';
  } else {
    metric = 'Verse:Link';
  }

  return (
    <Link
      to={`/${verse.chapterId}/${
        verse.verseNumber
      }?translations=${translations}`}
      data-metrics-event-name={metric}
    >
      {content}
    </Link>
  );
};

Badge.propTypes = propTypes;

export default Badge;
