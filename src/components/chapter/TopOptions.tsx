import React from 'react';
import PropTypes from 'prop-types';
import Share from '../Share';
import Title from '../dls/Title';
import { ChapterShape } from '../../shapes';

const propTypes = {
  title: PropTypes.string,
  chapter: ChapterShape.isRequired,
};

const defaultProps = {
  title: '',
};

type Props = {
  title?: string;
  chapter: ChapterShape;
};

const TopOptions: React.SFC<Props> = ({ title, chapter }: Props) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      {title && <Title>{title}</Title>}
    </div>
    <div className="col-md-8 text-right">
      <Share chapter={chapter} inline />
    </div>
  </div>
);

TopOptions.propTypes = propTypes;
TopOptions.defaultProps = defaultProps;

export default TopOptions;
