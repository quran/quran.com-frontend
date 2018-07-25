import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import JuzLink from './JuzLink';
import { ChapterShape, JuzShape } from '../shapes';

type Props = {
  juzs: $TsFixMe;
  chapters: $TsFixMe;
};

const Item = styled.li`
  color: ${({ theme }) => theme.brandPrimary};
`;

const JuzList: React.SFC<Props> = ({ juzs, chapters }: Props) => {
  return (
    <ul className="col-md-4 list-unstyled">
      {juzs.map((juz: JuzShape) => (
        <Item key={juz.juzNumber}>
          <div className="col-xs-2 col-md-1 text-muted">{juz.juzNumber}</div>
          <JuzLink juz={juz} chapters={chapters} />
        </Item>
      ))}
    </ul>
  );
};

JuzList.propTypes = {
  chapters: PropTypes.objectOf(ChapterShape).isRequired,
  juzs: PropTypes.arrayOf(JuzShape).isRequired,
};

export default JuzList;
